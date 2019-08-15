class CouponRecord {

  /**
   * @param {string} couponQRCodeHash
   * @param {number} consumerId
   */
  constructor (couponQRCodeHash, consumerId) {
    this.couponQRCodeHash = couponQRCodeHash
    this.consumerId = consumerId
  }

}

module.exports = CouponRecord
