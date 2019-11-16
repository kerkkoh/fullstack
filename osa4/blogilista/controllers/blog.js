const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  const token = request.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({ ...request.body, user })
    const newBlog = await blog.save()

    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()

    response.status(201).json(newBlog.toJSON())
  } catch (e) {
    if (e.name === 'ValidationError')
      response.status(400).end()
    else if (e.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    }
    else next(e)
  }
})

router.delete('/:id', async (request, response, next) => {
  /*try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (e) {
    res.status(400).end()
  }*/
  const token = request.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id) {
      await blog.remove()
      //await Blog.findByIdAndRemove(blog._id)
      response.status(204).end()
    } else response.status(401).json({ error: 'invalid token' })
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' })
    } else next(e)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { likes: req.body.likes })
    if (blog) res.json(blog.toJSON())
    else res.status(404).end()
  } catch (e) {
    next(e)
  }
})

module.exports = router