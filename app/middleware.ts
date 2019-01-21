import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'

import { Express } from 'express-serve-static-core'

export default function middleware(app: Express) {
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
