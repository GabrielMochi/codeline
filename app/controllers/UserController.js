const UserRepository = require('../repositories/UserRepository')
const UserSchema = require('../schemas/UserSchema')

class userController {

  constructor () {
    this.repository = new UserRepository()
  }

  /**
   * @param {Number} id
   * @returns {Promise<any>}
   */
  async getById (id) {
    return await this.repository.getById(id)
  }

  /**
   * @param {String} email
   * @returns {Promise<Number>}
   */
  async getIdByEmail (email) {
    return await this.repository.getIdByEmail(email)
  }

  /**
   * @param {Object} user
   * @returns {Promise<Number>}
   */
  async create (user) {
    user.id = user.id || 0

    const { error } = UserSchema.validate(user)

    if (error) throw error

    user.birth = new Date(user.birth)

    return await this.repository.create(user)
  }

  /**
   * @param {Number} id
   * @param {Object} user
   * @returns {Promise}
   */
  async update (id, user) {
    const { error } = UserSchema.validate(user)

    if (error) throw error

    user.birth = new Date(user.birth)

    return await this.repository.update(id, user)
  }

  /**
   * @param {Number} id
   * @returns {Promise<void>}
   */
  async delete (id) {
    return await this.repository.delete(id)
  }

}

module.exports = userController
