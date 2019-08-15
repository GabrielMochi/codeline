const LoginRepository = require('../repositories/LoginRepository')
const LoginSchema = require('../schemas/LoginSchema')

class LoginController {

  constructor () {
    this.repository = new LoginRepository()
  }

  /**
   * @param {Object} login
   * @returns {Promise<boolean>}
   */
  async authenticate (login) {
    const { error } = LoginSchema.validate(login)

    if (error) throw error

    return await this.repository.authenticate(login)
  }

  /**
   * @param {Object} login
   * @returns {Promise<void>}
   */
  async create (login) {
    const { error } = LoginSchema.validate(login)

    if (error) throw error

    return await this.repository.create(login)
  }

  /**
   * @param {String} email
   * @param {Object} login
   * @returns {Promise<void>}
   */
  async update (email, login) {
    const { error } = LoginSchema.validate(login)

    if (error) throw error

    return await this.repository.update(email, login)
  }

  /**
   * @param {string} email
   * @returns {Promise<void>}
   */
  async delete (email) {
    return await this.repository.delete(email)
  }

}

module.exports = LoginController
