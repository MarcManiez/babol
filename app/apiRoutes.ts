import { Router } from 'express'

import { post } from './controllers/linksController'
import { links } from './routeHelpers'

const apiRoutes = Router()
apiRoutes.post(links, post)

export default apiRoutes
