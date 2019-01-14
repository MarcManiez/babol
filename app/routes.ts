import { Express } from 'express-serve-static-core'

import createConnection from './db/connection'
import TestModel from './models/TestModel'

export default function routes(app: Express) {
  app.get('/', async (req, res) => {
    const testModel = new TestModel()
    testModel.haha = 0
    const connectionInstance = await createConnection()
    const testRepository = connectionInstance.getRepository(TestModel)
    await testRepository.save(testModel)
    const allTestModels = await testRepository.find()
    connectionInstance.close()
    res.render('index', { count: allTestModels.length })
  })
}
