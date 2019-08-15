const Repository = require('./Repository')

class QRCodeRepository extends Repository {

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
        'SELECT * FROM QRCode WHERE hash = ?',
        hash,
        (err, results) => {
          if (err) return reject(err)
          resolve(results[ 0 ])
        }
      )
    })
  }

  /**
   * @param {Object} QRCode
   * @returns {Promise<void>}
   */
  create (QRCode) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO QRCode SET ?',
        QRCode,
        (err) => {
          if (err) return reject(err)
          resolve(QRCode.hash)
        }
      )
    })
  }

  /**
   * @param {string} hash
   * @returns {Promise<void>}
   */
  setAsUsed (hash) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE QRCode SET used = 1 WHERE hash = ?',
        hash,
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }

}

module.exports = QRCodeRepository
