import { IdParsingError, LinkTypeParsingError } from '../../errors'
import { LinkType, StreamingService } from '../../types'

export function getId(url: string): string {
  const ids = url.match(/\d+((?=\/$)|$)/g)
  if (!ids) {
    throw new IdParsingError(url, StreamingService.Apple)
  }
  return ids[0]
}

export function getType(url: string): LinkType {
  if (url.match(/(?<=\?i=)\d+((?=\/$)|$)/g)) {
    return LinkType.Track
  } else if (url.match(/(?<=\/)album(?=\/)/g)) {
    return LinkType.Album
  } else if (url.match(/(?<=\/)artist(?=\/)/g)) {
    return LinkType.Artist
  } else {
    throw new LinkTypeParsingError(url, StreamingService.Apple)
  }
}
