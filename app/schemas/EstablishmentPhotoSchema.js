const Joi = require('joi')

const establishmentPhotoSchema = Joi.object().keys({
  imgPath: Joi.string().max(255).required(),
  establishmentId: Joi.number().required()
})

module.exports = establishmentPhotoSchema
