class CouponQRCode {

  /**
   * @param {string} hash
   * @param {number} couponId
   */
  constructor (hash, couponId) {
    this.hash = hash
    this.couponId = couponId
  }

}

module.exports = CouponQRCode
