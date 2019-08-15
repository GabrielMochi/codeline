class User {

  /**
   * @param {Number} id
   * @param {String} email
   * @param {String} firstName
   * @param {String} lastName
   * @param {Date} birth
   * @param {String} telephone
   * @param {String} zipcode
   * @param {String} country
   * @param {String} state
   * @param {String} city
   * @param {String} address
   * @param {Number} number
   * @param {String} complement
   */
  constructor (
    id, email, firstName,
    lastName, birth, telephone,
    zipcode, country, state,
    city, address, number,
    complement = null
  ) {
    this.id = id
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.birth = birth
    this.telephone = telephone
    this.zipcode = zipcode
    this.country = country
    this.state = state
    this.city = city
    this.address = address
    this.number = number
    this.complement = complement
  }

}

module.exports = User
