import { createConnection as typeormCreateConnection } from 'typeorm'

import AppleLinkCollection from '../models/AppleLinkCollection'
import SpotifyLinkCollection from '../models/SpotifyLinkCollection'
import TestModel from '../models/TestModel'
/* tslint:disable:no-var-requires */
const credentials = require('./credentials')
/* tslint:enable:no-var-requires */

export default function createConnection() {
  const { host, port, username, password, database } = credentials()
  return typeormCreateConnection({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [SpotifyLinkCollection, TestModel, AppleLinkCollection],
    synchronize: false,
    logging:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'log', 'info']
        : 'all',
  })
}
