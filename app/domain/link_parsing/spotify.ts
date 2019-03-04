import { IdParsingError, LinkTypeParsingError } from '../../errors'
import { LinkType, StreamingService } from '../../types/babol'

export function getId(url: string): string {
  const ids = url.match(
    /((?<=(track)(\/|:))|(?<=(artist)(\/|:))|(?<=(album)(\/|:)))\w+$/g,
  )
  if (!ids) {
    throw new IdParsingError(url, StreamingService.Spotify)
  }
  return ids[0]
}

export function getType(url: string): LinkType {
  if (url.match(/(?<=(\/|:))track(?=(\/|:))/g)) {
    return LinkType.Track
  } else if (url.match(/(?<=(\/|:))album(?=(\/|:))/g)) {
    return LinkType.Album
  } else if (url.match(/(?<=(\/|:))artist(?=(\/|:))/g)) {
    return LinkType.Artist
  } else {
    throw new LinkTypeParsingError(url, StreamingService.Spotify)
  }
}
