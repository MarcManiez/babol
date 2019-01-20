/* tslint:disable:no-var-requires */
const { config } = require('dotenv')
/* tslint:enable:no-var-requires */

config()

module.exports = function credentials() {
  let host
  let port
  let username
  let password
  let database
  if (process.env.NODE_ENV === 'production') {
    host = process.env.RDS_HOSTNAME
    port = process.env.RDS_PORT
    username = process.env.RDS_USERNAME
    password = process.env.RDS_PASSWORD
    database = process.env.RDS_DB_NAME
  } else if (process.env.NODE_ENV === 'test') {
    host = 'localhost'
    port = 5432
    database = 'babol_test'
  } else {
    host = process.env.DB_HOST
    port = process.env.DB_PORT
    username = process.env.DB_USERNAME
    password = process.env.DB_PASSWORD
    database = process.env.DB_NAME
  }
  return { host, port, username, password, database }
}
