import { getConnection } from 'typeorm'

import { getId } from '../../app/domain/link_parsing/apple'
import { generateSlug } from '../../app/domain/slugs'
import AppleLinkCollection from '../../app/models/AppleLinkCollection'
import { appleTrackUrl } from '../factories/links'

describe('AppleLinkCollection', () => {
  it('Generates a sourceId and a slug before inserting', async done => {
    await getConnection().transaction(async transactionalEntityManager => {
      const appleLinkCollection = new AppleLinkCollection(appleTrackUrl)
      const testRepository = transactionalEntityManager.getRepository(
        AppleLinkCollection,
      )
      await testRepository.save(appleLinkCollection)
      const persistedAppleLinkCollection = await testRepository.findOneOrFail({
        sourceLink: appleTrackUrl,
      })
      const expectedId = getId(appleTrackUrl)
      const expectedSlug = generateSlug(appleTrackUrl)
      expect(persistedAppleLinkCollection.sourceId).toEqual(expectedId)
      expect(persistedAppleLinkCollection.slug).toEqual(expectedSlug)
      done()
    })
  })
})
