const Joi = require('joi')

const loginSchema = Joi.object().keys({
  email: Joi.string().email().max(255).required(),
  password: Joi
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/)
    .min(8)
    .max(90)
    .required()
})

module.exports = loginSchema
