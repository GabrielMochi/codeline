class LoyaltyCardQRCode {

  /**
   * @param {string} hash
   * @param {number} loyaltyCardId
   */
  constructor (hash, loyaltyCardId) {
    this.hash = hash
    this.loyaltyCardId = loyaltyCardId
  }

}

module.exports = LoyaltyCardQRCode
