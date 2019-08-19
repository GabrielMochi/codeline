const { Router } = require('express')
const { asyncMiddleware } = require('../util/expressUtilities')
const boom = require('boom')
const LoginController = require('../controllers/LoginController')
const UserController = require('../controllers/UserController')
const SellerController = require('../controllers/SellerController')
const ConsumerController = require('../controllers/ConsumerController')

const router = Router()
const loginController = new LoginController()
const userController = new UserController()
const sellerController = new SellerController()
const consumerController = new ConsumerController()

router.post('/seller', asyncMiddleware(async (req, res) => {
  const isAuthenticated = await loginController.authenticate(req.body)

  if (!isAuthenticated) throw boom.unauthorized()

  const userId = await userController.getIdByEmail(req.body.email)
  const sellerId = await sellerController.getIdByUserId(userId)

  req.session.isLogged = true
  req.session.userId = userId
  req.session.sellerId = sellerId

  res.json(sellerId)
}))

router.post('/consumer', asyncMiddleware(async (req, res) => {
  const isAuthenticated = await loginController.authenticate(req.body)

  if (!isAuthenticated) throw boom.unauthorized()

  const userId = await userController.getIdByEmail(req.body.email)
  const consumerId = await consumerController.getIdByUserId(userId)

  req.session.isLogged = true
  req.session.userId = userId
  req.session.consumerId = consumerId

  res.json(consumerId)
}))

module.exports = router
