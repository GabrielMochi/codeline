const { Router } = require('express')
const boom = require('boom')
const { asyncMiddleware } = require('../../util/expressUtilities')
const Consumer = require('../../models/Consumer')
const Login = require('../../models/Login')
const User = require('../../models/User')
const ConsumerController = require('../../controllers/ConsumerController')
const LoginController = require('../../controllers/LoginController')
const UserController = require('../../controllers/UserController')

const router = Router()
const consumerController = new ConsumerController()
const loginController = new LoginController()
const userController = new UserController()

router.get('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (req.session.consumerId !== id)
    throw boom.unauthorized()

  const consumer = await consumerController.getById(id)

  res.json(consumer)
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
    const consumer = new Consumer(null, user.id)

    consumer.id = await consumerController.create(consumer)

    try {
      const login = new Login(req.body.email, req.body.password)

      await loginController.create(login)

      req.session.isLogged = true
      req.session.userId = user.id
      req.session.consumerId = consumer.id

      res.status(201).json(consumer)
    } catch (err) {
      await consumerController.delete(consumer.id)
      throw err
    }
  } catch (err) {
    await userController.delete(user.id)
    throw err
  }
}))

router.put('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (req.session.consumerId !== id)
    throw boom.unauthorized()

  await consumerController.update(id, req.body)

  res.json()
}))

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (req.session.consumerId !== id)
    throw boom.unauthorized()

  await consumerController.delete(id)

  res.json()
}))

module.exports = router
