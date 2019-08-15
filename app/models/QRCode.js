class QRCode {

  /**
   * @param {string} hash
   * @param {boolean} used
   */
  constructor (hash, used = false) {
    this.hash = hash
    this.used = used
  }

}

module.exports = QRCode
