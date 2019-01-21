import { createConnection as typeormCreateConnection } from 'typeorm'
import { LoggerOptions } from 'typeorm/logger/LoggerOptions'

import AppleLinkCollection from '../models/AppleLinkCollection'
import SpotifyLinkCollection from '../models/SpotifyLinkCollection'
import TestModel from '../models/TestModel'
/* tslint:disable:no-var-requires */
const credentials = require('./credentials')
/* tslint:enable:no-var-requires */

export default function createConnection() {
  const { host, port, username, password, database } = credentials()
  let logging: LoggerOptions
  if (process.env.NODE_ENV === 'production') {
    logging = 'all'
  } else if (process.env.NODE_ENV === 'test') {
    logging = ['error']
  } else {
    logging = ['query', 'warn', 'log', 'info']
  }
  return typeormCreateConnection({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [SpotifyLinkCollection, TestModel, AppleLinkCollection],
    synchronize: false,
    logging,
  })
}
