const { Router } = require('express')
const boom = require('boom')
const { asyncMiddleware } = require('../../util/expressUtilities')
const Login = require('../../models/Login')
const User = require('../../models/User')
const LoginController = require('../../controllers/LoginController')
const UserController = require('../../controllers/UserController')

const router = Router()
const loginController = new LoginController()
const userController = new UserController()

router.get('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (req.session.userId !== id)
    throw boom.unauthorized()

  const user = await userController.getById(id)

  res.json(user)
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
    const login = new Login(req.body.email, req.body.password)

    await loginController.create(login)

    req.session.isLogged = true
    req.session.userId = userId

    res.status(201).json(user.id)
  } catch (err) {
    await userController.delete(seller.id)
    throw err
  }
}))

module.exports = router
