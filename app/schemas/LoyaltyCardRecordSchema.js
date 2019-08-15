const Joi = require('joi')

const loyaltyCardRecordSchema = Joi.object().keys({
  loyaltyCardQRCodeHash: Joi.string().required(),
  consumerId: Joi.number().required()
})

module.exports = loyaltyCardRecordSchema
