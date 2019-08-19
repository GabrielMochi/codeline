// read all enviroments variables
require('dotenv').config()

const path = require('path')
const fs = require('fs')
const http = require('http')
const app = require('./app')
const logger = require('./config/logger')

// Creates default log files if they not exists
const infoLogFile = path.resolve(__dirname, 'logs/info.log')
const errorLogFile = path.resolve(__dirname, 'logs/error.log')

if (!fs.existsSync(infoLogFile))
  fs.writeFileSync(infoLogFile, '')

if (!fs.existsSync(errorLogFile))
  fs.writeFileSync(errorLogFile, '')

const port = process.env.PORT || 7021
const server = http.createServer(app)

server.listen(port, () => {
  logger.info(`The HTTP server is runnig on port: ${ port }`)
})
