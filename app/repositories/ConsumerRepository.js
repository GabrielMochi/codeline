const Repository = require('./Repository')
const boom = require('boom')

class ConsumerRepository extends Repository {

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
        'SELECT * FROM consumer WHERE id = ?',
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
        'SELECT id FROM consumer WHERE userId = ?',
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
   * @param {Object} consumer
   * @returns {Promise<Number>}
   */
  create (consumer) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO consumer SET ?',
        consumer,
        (err, result) => {
          if (err) return reject(err)
          resolve(result.insertId)
        }
      )
    })
  }

  /**
   * @param {Number} id
   * @param {Object} consumer
   * @returns {Promise<void>}
   */
  update (id, consumer) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE consumer SET ? WHERE id = ?',
        [ consumer, id ],
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
        'DELETE FROM consumer WHERE id = ?',
        id,
        (err) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

}
