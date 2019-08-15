const Repository = require('./Repository')
const boom = require('boom')

class UserRepository extends Repository {

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
        'SELECT * FROM user WHERE id = ?',
        id,
        (err, results) => {
          if (err) return reject(err)
          resolve(results[ 0 ])
        }
      )
    })
  }

  /**
   * @param {String} email
   * @returns {Promise<Number>}
   */
  getIdByEmail (email) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT id FROM user WHERE email = ?',
        email,
        (err, results) => {
          if (err) return reject(err)
          if (results.length === 0) return reject(boom.notFound())

          resolve(results[ 0 ].id)
        }
      )
    })
  }

  /**
   * @param {Object} user
   * @returns {Promise<Number>}
   */
  create (user) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO user SET ?',
        user,
        (err, result) => {
          if (err) return reject(err)
          resolve(result.insertId)
        }
      )
    })
  }

  /**
   * @param {Number} id
   * @param {Object} user
   * @returns {Promise<void>}
   */
  update (id, user) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE user SET ? WHERE id = ?',
        [ user, id ],
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
        'DELETE FROM user WHERE id = ?',
        id,
        (err) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

}

module.exports = UserRepository
