import { createConnection } from 'typeorm'

import SpotifyLinkCollection from '../models/SpotifyLinkCollection'
import TestModel from '../models/TestModel'

function url() {
  // TODO: Potentially handle test environment separately
  if (process.env.NODE_ENV !== 'production') {
    return process.env.DB_URL
  } else {
    const {
      RDS_USERNAME,
      RDS_PASSWORD,
      RDS_HOSTNAME,
      RDS_PORT,
      RDS_DB_NAME,
    } = process.env
    return `postgresql://${RDS_USERNAME}:${RDS_PASSWORD}@${RDS_HOSTNAME}:${RDS_PORT}/${RDS_DB_NAME}`
  }
}

export default createConnection({
  type: 'postgres',
  url: url(),
  entities: [SpotifyLinkCollection, TestModel],
    synchronize: false,
  logging:
    process.env.NODE_ENV === 'development'
      ? ['query', 'warn', 'log', 'info']
      : 'all',
})
