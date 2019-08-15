const Joi = require('joi')

const loyaltyCardSchema = Joi.object().keys({
  id: Joi.number().required(),
  couponId: Joi.number().required(),
  quantityOfPurchasesRequired: Joi.number().min(2).required()
})

module.exports = loyaltyCardSchema
