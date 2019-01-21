import { Express } from 'express-serve-static-core'

import apiRoutes from './apiRoutes'

export default function routes(app: Express) {
  app.get('/', async (req, res) => {
    // const testModel = new TestModel()
    // testModel.haha = 0
    // const connectionInstance = await getConnection()
    // const testRepository = connectionInstance.getRepository(TestModel)
    // await testRepository.save(testModel)
    // const allTestModels = await testRepository.find()
    res.render('index')
  })
  app.use('/api/v1', apiRoutes)
}
