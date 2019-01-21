import { Router } from 'express'

import { post } from './controllers/linksController'

const apiRoutes = Router()
apiRoutes.post('/link', post)

export default apiRoutes
