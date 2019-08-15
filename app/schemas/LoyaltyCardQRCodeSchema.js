const Joi = require('joi')

const loyaltyCardQRCodeSchema = Joi.object().keys({
  hash: Joi.string().required(),
  loyaltyCardId: Joi.number().required()
})

module.exports = loyaltyCardQRCodeSchema
