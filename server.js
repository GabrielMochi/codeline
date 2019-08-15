// read all enviroments variables
require('dotenv').config()

const http = require('http')
const app = require('./app')

const port = process.env.PORT || 7021

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`The HTTP server is runnig on port: ${ port }`)
})
