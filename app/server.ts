import * as express from 'express'

import routes from './routes'

const app = express()
const port = 80

app.set('views', './app/views')
app.set('view engine', 'pug')

routes(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
