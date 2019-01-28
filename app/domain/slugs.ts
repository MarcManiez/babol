import { createHash } from 'crypto'

import { SlugGenerationError, SlugParsingError } from '../errors'
import { StreamingService, StreamingServiceSlugPrefix } from '../types'
import * as apple from './link_parsing/apple'
import { detectStreamingService } from './link_parsing/general'
import * as spotify from './link_parsing/spotify'

const SLUG_LENGTH = 10

export function generateSlug(link: string): string {
  if (detectStreamingService(link) === StreamingService.Apple) {
    const id = apple.getId(link)
    const hash = id && hashId(id)
    return hash && StreamingServiceSlugPrefix.Apple + hash.slice(0, SLUG_LENGTH)
  } else if (detectStreamingService(link) === StreamingService.Spotify) {
    const id = spotify.getId(link)
    const hash = id && hashId(id)
    return (
      hash && StreamingServiceSlugPrefix.Spotify + hash.slice(0, SLUG_LENGTH)
    )
  }
  throw new SlugGenerationError(link)
}

export function parseSlug(slug: string): StreamingService {
  if (slug.startsWith(StreamingServiceSlugPrefix.Apple)) {
    return StreamingService.Apple
  } else if (slug.startsWith(StreamingServiceSlugPrefix.Spotify)) {
    return StreamingService.Spotify
  }
  throw new SlugParsingError(slug)
}

function hashId(id: string): string {
  const hash = createHash('sha256')
  hash.update(id)
  return hash.digest('hex')
}
