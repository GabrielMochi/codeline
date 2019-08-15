const Joi = require('joi')

const sellerSchema = Joi.object().keys({
  id: Joi.number().required(),
  userId: Joi.number().required()
})

module.exports = sellerSchema
