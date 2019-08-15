const Repository = require('./Repository')

class LoginRepository extends Repository {

  constructor () {
    super()
  }

  /**
   * @param {Object} seller
   * @returns {Promise<boolean>}
   */
  authenticate (login) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT TRUE FROM login WHERE email = ? AND password = ?',
        [ login.email, login.password ],
        (err, results) => {
          if (err) return reject(err)
          resolve(!!results.length)
        }
      )
    })
  }

  /**
   * @param {Object} seller
   * @returns {Promise<void>}
   */
  create (login) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO login SET ?',
        login,
        (err) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

  /**
   * @param {String} email
   * @param {Object} login
   * @returns {Promise<void>}
   */
  update (email, login) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE login SET ? WHERE email = ?',
        [ login, email ],
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }

  /**
   * @param {String} email
   * @returns {Promise<void>}
   */
  delete (email) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM login WHERE email = ?',
        email,
        (err) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

}

module.exports = LoginRepository
