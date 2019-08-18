const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const boom = require('boom')
const routes = require('./routes')

const app = express()

app.use(cors({
  origin: [
    /http(s)?:\/\/localhost:7021/g,
    /http(s)?:\/\/codelinepds\.heroku\.com/g
  ]
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'codeline.connect.sid',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', routes)

app.use((err, req, res, next) => {
  if (!err.isBoom) err = boom.badImplementation(err)
  if (err.isServer) console.error(err)
  return res.status(err.output.statusCode).json(err.output.payload)
})

module.exports = app
