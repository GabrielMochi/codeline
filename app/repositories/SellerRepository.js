const Repository = require('./Repository')
const boom = require('boom')

class SellerRepository extends Repository {

  constructor () {
    super()
  }

  /**
   * @param {Number} id
   * @returns {Promise<any>}
   */
  getById (id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM seller WHERE id = ?',
        id,
        (err, results) => {
          if (err) return reject(err)
          resolve(results[ 0 ])
        }
      )
    })
  }

  /**
   * @param {Number} userId
   * @returns {Promise<number>}
   */
  getIdByUserId (userId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT id FROM seller WHERE userId = ?',
        userId,
        (err, results) => {
          if (err) return reject(err)
          if (results.length === 0) return reject(boom.notFound())

          resolve(results[ 0 ].id)
        }
      )
    })
  }

  /**
   * @param {Object} seller
   * @returns {Promise<Number>}
   */
  create (seller) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO seller SET ?',
        seller,
        (err, result) => {
          if (err) return reject(err)
          resolve(result.insertId)
        }
      )
    })
  }

  /**
   * @param {Number} id
   * @param {Object} seller
   * @returns {Promise<void>}
   */
  update (id, seller) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE seller SET ? WHERE id = ?',
        [ seller, id ],
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }

  /**
   * @param {Number} id
   * @returns {Promise<void>}
   */
  delete (id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM seller WHERE id = ?',
        id,
        (err) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

}

module.exports = SellerRepository
