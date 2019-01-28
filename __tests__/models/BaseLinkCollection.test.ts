import { getConnection } from 'typeorm'

import { links } from '../../app/routeHelpers'
import { createAppleLinkCollection } from '../factories/appleLinkCollections'

describe('BaseLinkCollection', () => {
  describe('#babolLinkPath', () => {
    it('returns the path for a given apple link', async done => {
      await getConnection().transaction(async transactionalEntityManager => {
        const appleLinkCollection = await createAppleLinkCollection(
          transactionalEntityManager,
        )
        const expectedBabolLinkPath = links + '/' + appleLinkCollection.slug
        expect(appleLinkCollection.babolLinkPath()).toEqual(
          expectedBabolLinkPath,
        )
        done()
      })
    })
  })
})
