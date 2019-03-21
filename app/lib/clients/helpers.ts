import { CoreLinkProperties } from '../../domain/linkMatching'
import { LinkType } from '../../types/babol'

export function coreLinkPropertiesToSearchQuery(
  coreLinkProperties: CoreLinkProperties,
): string {
  const query = coreLinkProperties[LinkType.Artist]
  const album = coreLinkProperties[LinkType.Album]
  if (album) {
    query.concat(' ', album)
  }
  const track = coreLinkProperties[LinkType.Track]
  if (track) {
    query.concat(' ', track)
  }
  return query
}
