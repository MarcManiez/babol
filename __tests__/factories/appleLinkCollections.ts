import { EntityManager } from 'typeorm'

import AppleLinkCollection from '../../app/models/AppleLinkCollection'
import { appleTrackUrl, spotifyTrackUrl } from './links'

export async function createAppleLinkCollection(connection: EntityManager) {
  const repository = connection.getRepository(AppleLinkCollection)
  const appleLinkCollection = new AppleLinkCollection(appleTrackUrl)
  appleLinkCollection.artist = 'Behn Gillece'
  appleLinkCollection.album = 'Walk of Fire'
  appleLinkCollection.track = 'Walk of Fire'
  appleLinkCollection.spotifyLink = spotifyTrackUrl
  return await repository.save(appleLinkCollection)
}
