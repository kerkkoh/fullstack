const app = require('../app')
const api = require('supertest')(app)
const mongoose = require('mongoose')
const User = require('../models/user')

const sample = { name: 'yayo1', username: 'me12323', password: '/12345' }

beforeEach(async () => {
  await User.deleteMany({})
})

describe('with no initial data', () => {
  test('right amount of users are returned', async () => {
    const res = await api.get('/api/users')
    expect(res.body.length).toBe(0)
  })
  test('password is not defined for every user', async () => {
    const res = await api.get('/api/users')
    res.body.forEach(itm => {
      expect(itm.passwordHash).toBe(undefined)
    })
  })
  test('right amt of users once added via post', async () => {
    await api.post('/api/users').send(sample)
    const res = await api.get('/api/users')
    expect(res.body.length).toBe(1)
  })
  test('right amt of users once deleted via delete', async () => {
    await api.post('/api/users').send(sample)
    const ares = await api.get('/api/users')
    await api.delete(`/api/users/${ares.body[0].id}`)
    const bres = await api.get('/api/users')
    expect(bres.body.length).toBe(0)
  })
})

describe('validation', () => {
  test('username is required', async () => {
    const res = await api.post('/api/users').send({ name: 'yayo1', password: '/12345' })
    expect(res.status).toBe(400)
    expect(res.body.errors.username).toBeDefined()
    expect(res.body.errors.username.kind).toBe('required')
  })
  test('password is required', async () => {
    const res = await api.post('/api/users').send({ name: 'yayo1', username: 'helloworld' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Password is required')
  })
  test('password minlength 3', async () => {
    const res = await api.post('/api/users').send({ name: 'yayo1', username: 'helloworld', password: '1' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Password length should be >3')
  })
  test('username is unique', async () => {
    await api.post('/api/users').send(sample)
    const res = await api.post('/api/users').send(sample)
    expect(res.status).toBe(400)
    expect(res.body.errors.username).toBeDefined()
    expect(res.body.errors.username.kind).toBe('unique')
  })
  test('username has minlength 3', async () => {
    const res = await api.post('/api/users').send({ ...sample, username: 'h' })
    expect(res.status).toBe(400)
    expect(res.body.errors.username).toBeDefined()
    expect(res.body.errors.username.kind).toBe('minlength')
  })
})

afterAll(() => {
  mongoose.connection.close()
})