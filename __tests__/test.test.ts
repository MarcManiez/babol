import createConnection from '../app/db/connection'
import TestModel from '../app/models/TestModel'

describe('Interacting with the database', () => {
  it('Correctly creates a record', async done => {
    const testModel = new TestModel()
    testModel.haha = 0
    const connectionInstance = await createConnection()
    const testRepository = connectionInstance.getRepository(TestModel)
    await testRepository.save(testModel)
    const allTestModels = await testRepository.find()
    await connectionInstance.close()
    expect(allTestModels.length).toEqual(1)
    done()
  })
})
