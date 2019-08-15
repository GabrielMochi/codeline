const Joi = require('joi')

const date = new Date()

date.setFullYear(date.getFullYear() - 18)

const userSchema = Joi.object().keys({
  id: Joi.number().required(),
  email: Joi.string().email().max(255).required(),
  firstName: Joi.string().max(45).required(),
  lastName: Joi.string().max(45).required(),
  birth: Joi.date().max(date).required(),
  telephone: Joi
    .string()
    .max(30)
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    .required(),
  zipcode: Joi.string().max(45).required(),
  country: Joi.string().max(45).required(),
  state: Joi.string().max(45).required(),
  city: Joi.string().max(45).required(),
  address: Joi.string().max(255).required(),
  number: Joi.number().required(),
  complement: Joi.string().max(15).allow('').allow(null).optional(),
  profilePhoto: Joi.string().max(45).allow('').allow(null).optional()
})

module.exports = userSchema
