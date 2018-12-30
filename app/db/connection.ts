import { createConnection } from 'typeorm'
import SpotifyLinkCollection from '../models/SpotifyLinkCollection'

export default createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'marcmaniez',
  password: '',
  database: 'babol',
  entities: [SpotifyLinkCollection],
  synchronize: true,
  logging: false,
})
