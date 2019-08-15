const Joi = require('joi')

const couponRecordSchema = Joi.object().keys({
  couponQRCodeHash: Joi.string().required(),
  consumerId: Joi.number().required()
})

module.exports = couponRecordSchema
