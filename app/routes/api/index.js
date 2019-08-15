const { Router } = require('express')
const seller = require('./seller')
const establishment = require('./establishment')
const coupon = require('./coupon')
const couponQRCode = require('./couponQRCode')

const router = Router()

router.use('/seller', seller)
router.use('/establishment', establishment)
router.use('/coupon', coupon)
router.use('/couponQRCode', couponQRCode)

router.get('/', (req, res) => {
  res.end('API v.0.0.1')
})

module.exports = router
