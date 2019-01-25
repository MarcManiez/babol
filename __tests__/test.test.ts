import TestModel from '../app/models/TestModel'

import { getConnection } from 'typeorm'
import {
  createConnectionAndNukeDatabase,
  nukeDatabaseAndCloseConnection,
} from './setup/databaseSetupAndTearDown'

describe('Interacting with the database', () => {
  beforeEach(async done => {
    await createConnectionAndNukeDatabase()
    done()
  })

  afterEach(async done => {
    await nukeDatabaseAndCloseConnection()
    done()
  })

  it('Correctly creates a record', async done => {
    const testModel = new TestModel()
    testModel.haha = 0
    const connectionInstance = await getConnection()
    const testRepository = connectionInstance.getRepository(TestModel)
    await testRepository.save(testModel)
    const allTestModels = await testRepository.find()
    expect(allTestModels.length).toEqual(1)
    done()
  })
})
