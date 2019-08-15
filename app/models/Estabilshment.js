class Establishment {

  /**
   * @param {number} id
   * @param {number} sellerId
   * @param {string} name
   * @param {string} zipcode
   * @param {string} country
   * @param {string} state
   * @param {string} city
   * @param {string} address
   * @param {number} number
   * @param {string} category
   * @param {string} description
   * @param {string} complement
   * @param {string} email
   * @param {string} telephone
   * @param {string} site
   * @param {string} logoImgPath
   */
  constructor (
    id, sellerId, name, zipcode,
    country, state, city, address,
    number, category, description,
    complement = null, email = null,
    telephone = null, site = null,
    logoImgPath = null
  ) {
    this.id = id
    this.sellerId = sellerId
    this.name = name
    this.zipcode = zipcode
    this.country = country
    this.state = state
    this.city = city
    this.address = address
    this.number = number
    this.category = category
    this.description = description
    this.complement = complement
    this.email = email
    this.telephone = telephone
    this.site = site
    this.logoImgPath = logoImgPath
  }

}

module.exports = Establishment
