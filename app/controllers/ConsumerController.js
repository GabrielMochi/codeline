const ConsumerRepository = require('../repositories/ConsumerRepository')
const ConsumerSchema = require('../schemas/ConsumerSchema')

class ConsumerController {

  constructor () {
    this.repository = new ConsumerRepository()
  }

  /**
   * @param {Number} id
   * @returns {Promise<any>}
   */
  async getById (id) {
    return await this.repository.getById(id)
  }

  /**
   * @param {Number} userId
   * @returns {Promise<number>}
   */
  async getIdByUserId (userId) {
    return await this.repository.getIdByUserId(userId)
  }

  /**
   * @param {Object} seller
   * @returns {Promise<Number>}
   */
  async create (seller) {
    seller.id = seller.id || 0

    const { error } = ConsumerSchema.validate(seller)

    if (error) throw error

    return await this.repository.create(seller)
  }

  /**
   * @param {Number} id
   * @param {Object} seller
   * @returns {Promise}
   */
  async update (id, seller) {
    const { error } = ConsumerSchema.validate(seller)

    if (error) throw error

    return await this.repository.update(id, seller)
  }

  /**
   * @param {Number} id
   * @returns {Promise<void>}
   */
  async delete (id) {
    return await this.repository.delete(id)
  }

}

module.exports = ConsumerController
