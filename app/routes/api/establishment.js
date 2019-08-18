const { Router } = require('express')
const boom = require('boom')
const { asyncMiddleware } = require('../../util/expressUtilities')

const EstablishmentController = require(
  '../../controllers/EstablishmentController'
)

const router = Router()
const establishmentController = new EstablishmentController()

router.get('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const establishment = await establishmentController.get(id)

  if (req.session.sellerId !== establishment.sellerId)
    throw boom.unauthorized()

  res.json(establishment)
}))

router.get('/getBySellerId/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (req.session.sellerId !== id)
    throw boom.unauthorized()

  const establishments = await establishmentController.getBySellerId(id)

  res.json(establishments)
}))

router.post('/', asyncMiddleware(async (req, res) => {
  if (!req.body) throw boom.badRequest('Please provide a body content.')

  req.body.sellerId = req.body.sellerId || req.session.sellerId

  if (req.body.sellerId !== req.session.sellerId)
    throw boom.unauthorized()

  const establishmentId = await establishmentController.create(req.body)

  res.status(201).json(establishmentId)
}))

router.put('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const establishment = await establishmentController.get(id)

  if (req.session.sellerId !== establishment.sellerId)
    throw boom.unauthorized()

  await establishmentController.update(id, req.body)

  res.json()
}))

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const establishment = await establishmentController.get(id)

  if (req.session.sellerId !== establishment.sellerId)
    throw boom.unauthorized()

  await establishmentController.delete(id)

  res.json()
}))

module.exports = router
