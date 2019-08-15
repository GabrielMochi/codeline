class LoyaltyCardRecord {

  /**
   * @param {string} loyaltyCardQRCodeHash
   * @param {number} consumerId
   */
  constructor (loyaltyCardQRCodeHash, consumerId) {
    this.loyaltyCardQRCodeHash = loyaltyCardQRCodeHash
    this.consumerId = consumerId
  }

}

module.exports = LoyaltyCardRecord
