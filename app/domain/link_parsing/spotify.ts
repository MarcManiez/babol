import { LinkType } from '../../types'

export function getId(url: string): string | null {
  const ids = url.match(/\w+$/g)
  return ids && ids[0]
}

export function getType(url: string): LinkType | null {
  if (url.match(/(?<=(\/|:))track(?=(\/|:))/g)) {
    return LinkType.Track
  } else if (url.match(/(?<=(\/|:))album(?=(\/|:))/g)) {
    return LinkType.Album
  } else if (url.match(/(?<=(\/|:))artist(?=(\/|:))/g)) {
    return LinkType.Artist
  } else {
    return null
  }
}
