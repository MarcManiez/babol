import { config } from 'dotenv'
import * as express from 'express'

import createConnection from './db/connection'
import routes from './routes'

config()
const app = express()
const port = 3000

app.set('views', './app/views')
app.set('view engine', 'pug')

routes(app)

createConnection().then(_connectionPool => {
  console.log('Connection pool instantiated')
})
app.listen(port, () => console.log(`Listening on port ${port}!`))
