const credentials = require('./app/db/credentials.ts')

const { host, port, username, password, database } = credentials()

module.exports = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  migrations: ['app/db/compiled_migrations/*.js'],
  cli: {
    migrationsDir: 'app/db/migrations',
  }
}
