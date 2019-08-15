const Joi = require('joi')

const couponQRCodeSchema = Joi.object().keys({
  hash: Joi.string().required(),
  couponId: Joi.number().required()
})

module.exports = couponQRCodeSchema
