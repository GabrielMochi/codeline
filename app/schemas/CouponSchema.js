const Joi = require('joi')

const couponSchema = Joi.object().keys({
  id: Joi.number().required(),
  establishmentId: Joi.number().required(),
  description: Joi.string().max(500).required(),
  expirationDate: Joi.date().required(),
  activated: Joi.boolean().required(),
  photoPath: Joi.string().max(255).allow('').allow(null).optional()
})

module.exports = couponSchema
