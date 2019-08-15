const Joi = require('joi')

const QRCodeSchema = Joi.object().keys({
  hash: Joi.string().required(),
  used: Joi.boolean().required()
})

module.exports = QRCodeSchema
