const { Router } = require('express')
const boom = require('boom')
const { asyncMiddleware } = require('../../util/expressUtilities')
const Seller = require('../../models/Seller')
const Login = require('../../models/Login')
const User = require('../../models/User')
const SellerController = require('../../controllers/SellerController')
const LoginController = require('../../controllers/LoginController')
const UserController = require('../../controllers/UserController')

const router = Router()
const sellerController = new SellerController()
const loginController = new LoginController()
const userController = new UserController()

router.get('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (req.session.sellerId !== id)
    throw boom.unauthorized()

  const seller = await sellerController.getById(id)

  res.json(seller)
}))

router.post('/', asyncMiddleware(async (req, res) => {
  if (!req.body) throw boom.badRequest('Please provide a body content.')

  const user = new User(
    null,
    req.body.email,
    req.body.firstName,
    req.body.lastName,
    req.body.birth,
    req.body.telephone,
    req.body.zipcode,
    req.body.country,
    req.body.state,
    req.body.city,
    req.body.address,
    req.body.number,
    req.body.cpf,
    req.body.complement,
    req.body.profilePhoto
  )

  user.id = await userController.create(user)

  try {
    const seller = new Seller(null, user.id)

    seller.id = await sellerController.create(seller)

    try {
      const login = new Login(req.body.email, req.body.password)

      await loginController.create(login)

      req.session.isLogged = true
      req.session.userId = user.id
      req.session.sellerId = seller.id

      res.status(201).json(seller)
    } catch (err) {
      await sellerController.delete(seller.id)
      throw err
    }
  } catch (err) {
    await userController.delete(user.id)
    throw err
  }
}))

router.put('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (req.session.sellerId !== id)
    throw boom.unauthorized()

  await sellerController.update(id, req.body)

  res.json()
}))

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (req.session.sellerId !== id)
    throw boom.unauthorized()

  await sellerController.delete(id)

  res.json()
}))

module.exports = router
