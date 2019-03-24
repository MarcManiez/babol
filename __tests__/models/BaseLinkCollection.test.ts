import { getConnection } from 'typeorm'

import BaseLinkCollection from '../../app/models/base_classes/BaseLinkCollection'
import { links } from '../../app/routeHelpers'
import { createAppleLinkCollection } from '../factories/appleLinkCollections'
import * as coreLinkProperties from '../factories/coreLinkProperties'
import { appleAlbumUrl } from '../factories/links'

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

  describe('#applyCoreLinkProperties', () => {
    it('applies the artist for an artist', () => {
      const linkCollection = new BaseLinkCollection(appleAlbumUrl)
      linkCollection.applyCoreLinkProperties(
        coreLinkProperties.artistProperties,
      )
      expect(linkCollection).toHaveProperty(
        'artist',
        coreLinkProperties.artistProperties.artist,
      )
    })

    it('applies the artist and album for an album', () => {
      const linkCollection = new BaseLinkCollection(appleAlbumUrl)
      linkCollection.applyCoreLinkProperties(coreLinkProperties.albumProperties)
      expect(linkCollection).toHaveProperty(
        'artist',
        coreLinkProperties.albumProperties.artist,
      )
      expect(linkCollection).toHaveProperty(
        'album',
        coreLinkProperties.albumProperties.album,
      )
    })

    it('applies the artist, album and track for a track', () => {
      const linkCollection = new BaseLinkCollection(appleAlbumUrl)
      linkCollection.applyCoreLinkProperties(coreLinkProperties.trackProperties)
      expect(linkCollection).toHaveProperty(
        'artist',
        coreLinkProperties.trackProperties.artist,
      )
      expect(linkCollection).toHaveProperty(
        'album',
        coreLinkProperties.trackProperties.album,
      )
      expect(linkCollection).toHaveProperty(
        'track',
        coreLinkProperties.trackProperties.track,
      )
    })
  })
})
