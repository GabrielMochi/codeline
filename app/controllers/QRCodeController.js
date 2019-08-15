const QRCodeRepository = require('../repositories/QRCodeRepository')
const QRCode = require('../models/QRCode')
const uniqid = require('uniqid')

const QRCodeSchema = require('../schemas/QRCodeSchema')

class QRCodeController {

  constructor () {
    this.repository = new QRCodeRepository()
  }

  /**
   * @param {string} hash
   * @returns {Promise<any>}
   */
  async get (hash) {
    const qrCode = await this.repository.get(hash)

    qrCode.used = qrCode.used === 1

    return qrCode
  }

  /**
   * @returns {Promise<string>}
   */
  async create () {
    const qrCode = new QRCode(uniqid())

    const { error } = QRCodeSchema.validate(qrCode)

    if (error) throw error

    return await this.repository.create(qrCode)
  }

  /**
   * @param {string} hash
   * @returns {Promise<void>}
   */
  async setAsUsed (hash) {
    return await this.repository.setAsUsed(hash)
  }

}

module.exports = QRCodeController
