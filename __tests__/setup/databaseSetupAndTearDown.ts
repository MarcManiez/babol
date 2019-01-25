import { getConnection } from 'typeorm'

import createConnection from '../../app/db/connection'

/**
 * Transaction use with typeorm comes with a healthy dose of caveats:
 * http://typeorm.io/#/transactions/creating-and-using-transactions
 * This means we will probably need to write methods interacting with models
 * in a functional way, providing an argument for the connection object
 * This will make running controller tests in a transaction complicated, for example
 */

beforeEach(async done => {
  await createConnection()
  const connectionInstance = await getConnection()
  for (const entityMetadata of connectionInstance.entityMetadatas) {
    const repository = await connectionInstance.getRepository(
      entityMetadata.name,
    )
    await repository.clear()
  }
  done()
})

afterEach(async done => {
  const connectionInstance = await getConnection()
  for (const entityMetadata of connectionInstance.entityMetadatas) {
    const repository = await connectionInstance.getRepository(
      entityMetadata.name,
    )
    await repository.clear()
  }
  await connectionInstance.close()
  done()
})
