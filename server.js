// read all enviroments variables
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const dotEnvFileByEnviromentPath = path.join(
  __dirname,
  `.env.${ process.env.NODE_ENV }`
)

dotenv.config() // read default .env

if (fs.existsSync(dotEnvFileByEnviromentPath))
  dotenv.config({ path: dotEnvFileByEnviromentPath }) // read .env by enviroment

const http = require('http')
const https = require('https')
const app = require('./app')

const key = fs.readFileSync(path.join(
  __dirname,
  'certificates',
  'server.key'
))

const cert = fs.readFileSync(path.join(
  __dirname,
  'certificates',
  'server.cert'
))

const httpServer = http.createServer((req, res) => {
  // redirects to HTTPS server
  res.writeHead(301, {
    Location: `https://${ req.headers.host }${ req.url }`
  })

  res.end()
})

const httpsServer = https.createServer({ key, cert }, app)

const httpPort = process.env.HTTP_PORT || 80
const httpsPort = process.env.HTTPS_PORT || 443

httpServer.listen(httpPort, () => {
  console.log(`The HTTP server is runnig on port: ${ httpPort }`)
})

httpsServer.listen(httpsPort, () => {
  console.log(`The HTTPS server is runnig on port: ${ httpsPort }`)
})
