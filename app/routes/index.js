const { Router } = require('express')
const boom = require('boom')
const api = require('./api')
const login = require('./login')
const logout = require('./logout')
const { version } = require('../../package.json')

const router = Router()

router.all('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    if (req.path === '/api/seller' && req.method === 'POST') return next()
    if (req.session.isLogged) return next()
    else return next(boom.unauthorized())
  }

  next()
})

router.use('/login', login)
router.use('/logout', logout)
router.use('/api', api)

router.get('/', (req, res) => {
  res.end(`CodeLine API v.${ version }`)
})

module.exports = router
