const { createConnection } = require('mysql')

class Repository {

  constructor () {
    // Create the connection to MySQL server.
    this.connection = createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD || '',
      database: 'codeline'
    })
  }

  /**
   * Open the connection asynchronously.
   * @returns {Promise}
   */
  connect () {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  /**
   * Close the connection asynchronously.
   * @returns {Promise}
   */
  close () {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

}

module.exports = Repository
