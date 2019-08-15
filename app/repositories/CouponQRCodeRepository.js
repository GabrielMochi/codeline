const Repository = require('./Repository')

class CouponQRCodeRepository extends Repository {

  constructor () {
    super()
  }

  /**
   * @param {Number} hash
   * @returns {Promise<any>}
   */
  get (hash) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM couponQRCode WHERE hash = ?',
        hash,
        (err, results) => {
          if (err) return reject(err)
          resolve(results[ 0 ])
        }
      )
    })
  }

  /**
   * @param {Object} couponQRCode
   * @returns {Promise<void>}
   */
  create (couponQRCode) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO couponQRCode SET ?',
        couponQRCode,
        (err, result) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

}

module.exports = CouponQRCodeRepository
