const { Router } = require('express')
const boom = require('boom')
const { asyncMiddleware } = require('../../util/expressUtilities')

const CouponController = require('../../controllers/CouponController')

const router = Router()
const couponController = new CouponController()

router.get('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const coupon = await couponController.get(id)

  res.json(coupon)
}))

router.get('/getByEstablishmentId/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  const coupons = await couponController.getByEstablishmentId(id)

  res.json(coupons)
}))

router.post('/', asyncMiddleware(async (req, res) => {
  if (!req.body) throw boom.badRequest('Please provide a body content.')

  const couponId = await couponController.create(req.body)

  res.status(201).json(couponId)
}))

router.put('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  await couponController.update(id, req.body)

  res.json()
}))

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  await couponController.delete(id)

  res.json()
}))

module.exports = router
