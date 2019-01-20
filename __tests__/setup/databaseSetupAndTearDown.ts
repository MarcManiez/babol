import { getConnection } from 'typeorm'

import createConnection from '../../app/db/connection'

afterEach(async done => {
  const connectionPool = await createConnection()

  const connectionInstance = await getConnection()
  for (const entityMetadata of connectionInstance.entityMetadatas) {
    const repository = await connectionInstance.getRepository(
      entityMetadata.name,
    )
    await repository.clear()
  }
  await connectionPool.close()
  done()
})
