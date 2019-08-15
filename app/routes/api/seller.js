const { Router } = require('express')
const boom = require('boom')
const { asyncMiddleware } = require('../../util/expressUtilities')
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

  const user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birth: req.body.birth,
    telephone: req.body.telephone,
    zipcode: req.body.zipcode,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    number: req.body.number,
    complement: req.body.complement,
    profilePhoto: req.body.profilePhoto
  }

  user.id = await userController.create(user)

  try {
    const seller = { userId: user.id }

    seller.id = await sellerController.create(seller)

    try {
      await loginController.create({
        email: req.body.email,
        password: req.body.password
      })

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
