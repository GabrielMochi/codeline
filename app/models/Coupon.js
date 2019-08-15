class Coupon {

  /**
   * @param {number} id
   * @param {number} establishmentId
   * @param {string} description
   * @param {Date} expirationDate
   * @param {boolean} activated
   * @param {string} photoPath
   */
  constructor (
    id, establishmentId, description,
    expirationDate, activated = true,
    photoPath = null
  ) {
    this.id = id
    this.establishmentId = establishmentId
    this.description = description
    this.expirationDate = expirationDate
    this.activated = activated
    this.photoPath = photoPath
  }

}

module.exports = Coupon
