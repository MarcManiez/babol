import { Express } from 'express-serve-static-core'

export default function routes(app: Express) {
  app.get('/', (req, res) => res.render('index'))
}
