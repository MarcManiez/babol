import { getConnection } from 'typeorm'

import { getId } from '../../app/domain/link_parsing/spotify'
import { generateSlug } from '../../app/domain/slugs'
import SpotifyLinkCollection from '../../app/models/SpotifyLinkCollection'
import { spotifyTrackUrl } from '../factories/links'

describe('SpotifyLinkCollection', () => {
  it('Generates a sourceId and a slug before inserting', async done => {
    await getConnection().transaction(async transactionalEntityManager => {
      const appleLinkCollection = new SpotifyLinkCollection(spotifyTrackUrl)
      const testRepository = transactionalEntityManager.getRepository(
        SpotifyLinkCollection,
      )
      await testRepository.save(appleLinkCollection)
      const persistedSpotifyLinkCollection = await testRepository.findOneOrFail(
        {
          sourceLink: spotifyTrackUrl,
        },
      )
      const expectedId = getId(spotifyTrackUrl)
      const expectedSlug = generateSlug(spotifyTrackUrl)
      expect(persistedSpotifyLinkCollection.sourceId).toEqual(expectedId)
      expect(persistedSpotifyLinkCollection.slug).toEqual(expectedSlug)
      done()
    })
  })
})
