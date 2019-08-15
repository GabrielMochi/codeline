const Joi = require('joi')

const establishmentSchema = Joi.object().keys({
  id: Joi.number().required(),
  sellerId: Joi.number().required(),
  name: Joi.string().max(255).required(),
  zipcode: Joi.string().max(45).required(),
  country: Joi.string().max(45).required(),
  state: Joi.string().max(45).required(),
  city: Joi.string().max(45).required(),
  address: Joi.string().max(255).required(),
  number: Joi.number().required(),
  category: Joi.string().max(45).required(),
  description: Joi.string().max(500),
  complement: Joi.string().max(15).allow('').allow(null).optional(),
  email: Joi.string().max(255).allow('').allow(null).optional(),
  telephone: Joi
    .string()
    .max(30)
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    .allow('')
    .allow(null)
    .optional(),
  site: Joi
    .string()
    .max(255)
    .regex(new RegExp([
      '(https?:\/\/(?:www\.|(?!www))',
      '[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}',
      '|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}',
      '|https?:\/\/(?:www\.|(?!www))',
      '[a-zA-Z0-9]+\.[^\s]{2,}',
      'www\.[a-zA-Z0-9]+\.[^\s]{2,})'
    ].join('')))
    .allow('')
    .allow(null)
    .optional(),
  logoImgPath: Joi.string().max(255).allow('').allow(null).optional()
})

module.exports = establishmentSchema
