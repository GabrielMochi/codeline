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
   * @param {String} cpf
   * @param {String} complement
   * @param {String} profilePhoto
   */
  constructor (
    id, email, firstName,
    lastName, birth, telephone,
    zipcode, country, state,
    city, address, number, cpf,
    complement = null, profilePhoto = null,
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
    this.cpf = cpf
    this.complement = complement
    this.profilePhoto = profilePhoto
  }

}

module.exports = User
