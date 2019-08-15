const Repository = require('./Repository')

class couponRepository extends Repository {

  constructor () {
    super()
  }

  /**
   * @param {Number} id
   * @returns {Promise<any>}
   */
  get (id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM coupon WHERE id = ?',
        id,
        (err, results) => {
          if (err) return reject(err)
          resolve(results[ 0 ])
        }
      )
    })
  }

  /**
   * @param {number} establishmentId
   * @returns {Promise<Array>}
   */
  getByEstablishmentId (establishmentId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM coupon WHERE establishmentId = ?',
        establishmentId,
        (err, results) => {
          if (err) return reject(err)
          resolve(results)
        }
      )
    })
  }

  /**
   * @param {Object} coupon
   * @returns {Promise<Number>}
   */
  create (coupon) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO coupon SET ?',
        coupon,
        (err, result) => {
          if (err) return reject(err)
          resolve(result.insertId)
        }
      )
    })
  }

  /**
   * @param {Number} id
   * @param {Object} coupon
   * @returns {Promise<void>}
   */
  update (id, coupon) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE coupon SET ? WHERE id = ?',
        [ coupon, id ],
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }

}

module.exports = couponRepository
