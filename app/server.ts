import { config } from 'dotenv'
import * as express from 'express'
import 'source-map-support/register'

import createConnection from './db/connection'
import middleware from './middleware'
import routes from './routes'

config()
const app = express()
const port = 3000

app.set('views', './app/views')
app.set('view engine', 'pug')
app.use(express.static('public'))

createConnection().then(connectionPool => {
  console.log('Connection pool instantiated')
})

middleware(app)
routes(app)

app.listen(port, () => console.log(`Listening on port ${port}!`))
