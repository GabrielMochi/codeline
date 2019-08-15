const CouponRepository = require(
  '../repositories/CouponRepository'
)

const CouponSchema = require('../schemas/CouponSchema')

class CouponController {

  constructor () {
    this.repository = new CouponRepository()
  }

  /**
   * @param {Number} id
   * @returns {Promise<any>}
   */
  async get (id) {
    return await this.repository.get(id)
  }

  /**
   * @param {number} establishmentId
   * @returns {Promise<Array>}
   */
  async getByEstablishmentId (establishmentId) {
    return await this.repository.getByEstablishmentId(establishmentId)
  }

  /**
   * @param {Object} coupon
   * @returns {Promise<Number>}
   */
  async create (coupon) {
    coupon.id = coupon.id || 0

    const { error } = CouponSchema.validate(coupon)

    coupon.expirationDate = new Date(coupon.expirationDate)

    if (error) throw error

    return await this.repository.create(coupon)
  }

  /**
   * @param {Number} id
   * @param {Object} coupon
   * @returns {Promise}
   */
  async update (id, coupon) {
    const { error } = CouponSchema.validate(coupon)

    if (error) throw error

    coupon.expirationDate = new Date(coupon.expirationDate)

    return await this.repository.update(id, coupon)
  }

  /**
   * @param {Number} id
   * @returns {Promise<void>}
   */
  async delete (id) {
    return await this.repository.delete(id)
  }

}

module.exports = CouponController
