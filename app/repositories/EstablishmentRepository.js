const Repository = require('./Repository')

class EstablishmentRepository extends Repository {

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
        'SELECT * FROM establishment WHERE id = ?',
        id,
        (err, results) => {
          if (err) return reject(err)
          resolve(results[ 0 ])
        }
      )
    })
  }

  /**
   * @param {Number} sellerId
   * @returns {Promise<Array>}
   */
  getBySellerId (sellerId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM establishment WHERE sellerId = ?',
        sellerId,
        (err, results) => {
          if (err) return reject(err)
          resolve(results)
        }
      )
    })
  }

  /**
   * @param {Object} establishment
   * @returns {Promise<Number>}
   */
  create (establishment) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO establishment SET ?',
        establishment,
        (err, result) => {
          if (err) return reject(err)
          resolve(result.insertId)
        }
      )
    })
  }

  /**
   * @param {Number} id
   * @param {Object} establishment
   * @returns {Promise<void>}
   */
  update (id, establishment) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE establishment SET ? WHERE id = ?',
        [ establishment, id ],
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
        'DELETE FROM establishment WHERE id = ?',
        id,
        (err) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

}

module.exports = EstablishmentRepository
