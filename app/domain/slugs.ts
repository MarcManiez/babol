import { createCipher } from 'crypto'

import { SlugGenerationError, SlugParsingError } from '../errors'
import { StreamingService, StreamingServiceSlugPrefix } from '../types'
import * as apple from './link_parsing/apple'
import { detectStreamingService } from './link_parsing/general'
import * as spotify from './link_parsing/spotify'

const SLUG_LENGTH = 10

export function generateSlug(link: string): string {
  if (detectStreamingService(link) === StreamingService.Apple) {
    const id = apple.getId(link)
    const encryptedId = id && encryptId(id)
    return (
      encryptedId &&
      StreamingServiceSlugPrefix.Apple + encryptedId.slice(0, SLUG_LENGTH)
    )
  } else if (detectStreamingService(link) === StreamingService.Spotify) {
    const id = spotify.getId(link)
    const encryptedId = id && encryptId(id)
    return (
      encryptedId &&
      StreamingServiceSlugPrefix.Spotify + encryptedId.slice(0, SLUG_LENGTH)
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

function encryptId(id: string): string {
  const encryptionKey = process.env.BABOL_SLUG_ENCRYPTION_KEY
  if (!encryptionKey) {
    throw new Error('Must define env variable "BABOL_SLUG_ENCRYPTION_KEY"')
  }
  const cipher = createCipher('aes-256-cbc', encryptionKey)
  let encryptedId = cipher.update(id, 'utf8', 'hex')
  return (encryptedId += cipher.final('hex'))
}
