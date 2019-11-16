const app = require('../app')
const api = require('supertest')(app)
const mongoose = require('mongoose')
const { initialBlogs } = require('../utils/config')
const Blog = require('../models/blog')


/*const allBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}*/
describe('with initial data', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let b of initialBlogs) {
      let blog = new Blog(b)
      await blog.save()
    }
  })
  test('right amount of blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(initialBlogs.length)
  })
  test('id is defined for every blog entry', async () => {
    const res = await api.get('/api/blogs')
    res.body.forEach(itm => {
      expect(itm.id).toBeDefined()
    })
  })
  test('right amt of blogs once added via post', async () => {
    await api.post('/api/blogs').send({ title: 'yayo1', author: 'me', url: '/12345', likes: 0 })
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(initialBlogs.length + 1)
  })
  test('right amt of blogs once deleted via delete', async () => {
    const ares = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${ares.body[0].id}`)
    const bres = await api.get('/api/blogs')
    expect(bres.body.length).toBe(initialBlogs.length - 1)
  })
  test('right amt of likes once updated by put', async () => {
    const ares = await api.get('/api/blogs')
    const id = ares.body[0].id
    await api.put(`/api/blogs/${id}`).send({ likes: 0 })
    const bres = await api.get('/api/blogs')
    expect(bres.body.filter(itm => itm.id === id)[0].likes).toBe(0)
  })
})

describe('data addition /wo initial data', () => {
  beforeEach(async () => await Blog.deleteMany({}))
  test('right amt of blogs once added via post', async () => {
    await api.post('/api/blogs').send({ title: 'yayo1', author: 'me', url: '/12345', likes: 0 })
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(1)
  })
  test('likes is 0 by default', async () => {
    const res = await api.post('/api/blogs').send({ title: 'yayo1', author: 'me', url: '/12345' })
    expect(res.body.likes).toBe(0)
  })
  test('title is required', async () => {
    const res = await api.post('/api/blogs').send({ author: 'me', url: '/1241333' })
    expect(res.status).toBe(400)
  })
  test('url is required', async () => {
    const res = await api.post('/api/blogs').send({ title: 'hello', author: 'me' })
    expect(res.status).toBe(400)
  })
  test('title&url are required', async () => {
    const res = await api.post('/api/blogs').send({ title: 'hello', author: 'me' })
    expect(res.status).toBe(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})