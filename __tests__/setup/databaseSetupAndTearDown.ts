import { getConnection } from 'typeorm'

import createConnection from '../../app/db/connection'

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
