const Joi = require('joi')

const consumerSchema = Joi.object().keys({
  id: Joi.number().required(),
  userId: Joi.number().required()
})

module.exports = consumerSchema
