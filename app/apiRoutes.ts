import { Router } from 'express'

import * as linksController from './controllers/linksController'
import { links } from './routeHelpers'

const apiRoutes = Router()
apiRoutes.post(links, linksController.post)

export default apiRoutes
