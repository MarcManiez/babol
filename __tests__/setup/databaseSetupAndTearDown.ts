import { getConnection } from 'typeorm'

import createConnection from '../../app/db/connection'

export async function createConnectionAndNukeDatabase() {
  await createConnection()
  const connectionInstance = await getConnection()
  for (const entityMetadata of connectionInstance.entityMetadatas) {
    const repository = await connectionInstance.getRepository(
      entityMetadata.name,
    )
    await repository.clear()
  }
}

export async function nukeDatabaseAndCloseConnection() {
  const connectionInstance = await getConnection()
  for (const entityMetadata of connectionInstance.entityMetadatas) {
    const repository = await connectionInstance.getRepository(
      entityMetadata.name,
    )
    await repository.clear()
  }
  await connectionInstance.close()
}
