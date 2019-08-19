const { Router } = require('express')
const user = require('./user')
const seller = require('./seller')
const consumer = require('./consumer')
const establishment = require('./establishment')
const coupon = require('./coupon')
const couponQRCode = require('./couponQRCode')
const { version } = require('../../../package.json')

const router = Router()

router.use('/user', user)
router.use('/seller', seller)
router.use('/consumer', consumer)
router.use('/establishment', establishment)
router.use('/coupon', coupon)
router.use('/couponQRCode', couponQRCode)

router.get('/', (req, res) => {
  res.end(`API v.${ version }`)
})

module.exports = router
