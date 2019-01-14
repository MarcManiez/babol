/* tslint:disable:no-var-requires */
const { config } = require('dotenv')
/* tslint:enable:no-var-requires */

config()

module.exports = function credentials() {
  let host = process.env.DB_HOST
  let port = process.env.DB_PORT
  let username = process.env.DB_USERNAME
  let password = process.env.DB_PASSWORD
  let database = process.env.DB_NAME
  if (process.env.NODE_ENV === 'production') {
    host = process.env.RDS_HOSTNAME
    port = process.env.RDS_PORT
    username = process.env.RDS_USERNAME
    password = process.env.RDS_PASSWORD
    database = process.env.RDS_DB_NAME
  }
  return { host, port, username, password, database }
}
