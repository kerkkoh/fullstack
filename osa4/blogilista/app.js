const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const tokenExtractor = require('./utils/tokenExtractor')

mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(tokenExtractor)

app.use('/api/blogs', require('./controllers/blog'))
app.use('/api/users', require('./controllers/user'))
app.use('/api/login', require('./controllers/login'))

module.exports = app