const CouponQRCodeRepository = require(
  '../repositories/CouponQRCodeRepository'
)

const couponQRCodeSchema = require('../schemas/CouponQRCodeSchema')

class CouponQRCodeController {

  constructor () {
    this.repository = new CouponQRCodeRepository()
  }

  /**
   * @param {string} hash
   * @returns {Promise<any>}
   */
  async get (hash) {
    return await this.repository.get(hash)
  }

  /**
   * @param {Object} couponQRCode
   * @returns {Promise<void>}
   */
  async create (couponQRCode) {
    const { error } = couponQRCodeSchema.validate(couponQRCode)

    if (error) throw error

    return await this.repository.create(couponQRCode)
  }

  /**
   * @param {string} hash
   * @param {Object} QRCode
   * @returns {Promise}
   */
  async update (hash, QRCode) {
    const { error } = couponQRCodeSchema.validate(QRCode)

    if (error) throw error

    return await this.repository.update(hash, QRCode)
  }

}

module.exports = CouponQRCodeController
