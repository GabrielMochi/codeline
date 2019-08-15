const EstablishmentRepository = require(
  '../repositories/EstablishmentRepository'
)

const EstablishmentSchema = require('../schemas/EstablishmentSchema')

class EstablishmentController {

  constructor () {
    this.repository = new EstablishmentRepository()
  }

  /**
   * @param {Number} id
   * @returns {Promise<any>}
   */
  async get (id) {
    return await this.repository.get(id)
  }

  /**
   * @param {number} sellerId
   * @returns {Promise<Array>}
   */
  async getBySellerId (sellerId) {
    return await this.repository.getBySellerId(sellerId)
  }

  /**
   * @param {Object} establishment
   * @returns {Promise<Number>}
   */
  async create (establishment) {
    establishment.id = establishment.id || 0

    const { error } = EstablishmentSchema.validate(establishment)

    if (error) throw error

    return await this.repository.create(establishment)
  }

  /**
   * @param {Number} id
   * @param {Object} establishment
   * @returns {Promise}
   */
  async update (id, establishment) {
    const { error } = EstablishmentSchema.validate(establishment)

    if (error) throw error

    return await this.repository.update(id, establishment)
  }

  /**
   * @param {Number} id
   * @returns {Promise<void>}
   */
  async delete (id) {
    return await this.repository.delete(id)
  }

}

module.exports = EstablishmentController
