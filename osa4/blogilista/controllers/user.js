const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  const stuff = users.map(user => {
    const u = user.toJSON()
    return {
      id: u.id,
      name: u.name,
      username: u.username,
      blogs: u.blogs,
    }
  })
  response.json(stuff)
})

router.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (!body.password)
      return response.status(400).json({ error: 'Password is required' })
    else if (body.password.length < 3)
      return response.status(400).json({ error: 'Password length should be >3' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      blogs: [],
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (e) {
    if (e.name === 'ValidationError')
      response.status(400).json({ errors: e.errors })
    else
      next(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (e) {
    res.status(400).end()
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const person = await User.findByIdAndUpdate(req.params.id, { likes: req.body.likes })
    if (person) res.json(person.toJSON())
    else res.status(404).end()
  } catch (e) {
    next(e)
  }
})

module.exports = router