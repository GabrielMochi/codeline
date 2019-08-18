const { Router } = require('express')
const boom = require('boom')
const { asyncMiddleware } = require('../../util/expressUtilities')
const CouponQRCode = require('../../models/CouponQRCode')
const QRCodeController = require('../../controllers/QRCodeController')

const CouponQRCodeController = require(
  '../../controllers/CouponQRCodeController'
)

const router = Router()
const qrCodeController = new QRCodeController()
const couponQRCodeController = new CouponQRCodeController()

router.get('/:hash', asyncMiddleware(async (req, res) => {
  const qrCode = await qrCodeController.get(req.params.hash)

  if (qrCode.used) throw boom.notFound()

  await qrCodeController.setAsUsed(req.params.hash)

  res.json()
}))

router.get('/create/:couponId', asyncMiddleware(async (req, res) => {
  const couponId = parseInt(req.params.couponId, 10)
  const hash = await qrCodeController.create()

  try {
    const couponQRCode = new CouponQRCode(hash, couponId)

    await couponQRCodeController.create(couponQRCode)

    res.json(hash)
  } catch (err) {
    await qrCodeController.setAsUsed(hash)

    throw err
  }
}))

module.exports = router
