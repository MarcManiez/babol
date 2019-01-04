import { createConnection } from 'typeorm'

import SpotifyLinkCollection from '../models/SpotifyLinkCollection'
import TestModel from '../models/TestModel'

export default createConnection({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [SpotifyLinkCollection, TestModel],
  synchronize: process.env.NODE_ENV === 'development',
  logging:
    process.env.NODE_ENV === 'development'
      ? ['query', 'warn', 'log', 'info']
      : 'all',
})
