import { generateSlug, parseSlug } from '../../app/domain/slugs'
import { StreamingService, StreamingServiceSlugPrefix } from '../../app/types'
import * as links from '../factories/links'

describe('generateSlug', () => {
  it('should start with the correct prefix for a Spotify link', () => {
    const slug = generateSlug(links.spotifyAlbumUrl)
    expect(slug && slug.slice(0, 3)).toBe(StreamingServiceSlugPrefix.Spotify)
  })

  it('should start with the correct prefix for an Apple link', () => {
    const slug = generateSlug(links.appleAlbumUrl)
    expect(slug && slug.slice(0, 3)).toBe(StreamingServiceSlugPrefix.Apple)
  })

  it('should generate the same slug given the same link', () => {
    const slug1 = generateSlug(links.spotifyAlbumUrl)
    const slug2 = generateSlug(links.spotifyAlbumUrl)
    expect(slug1).toEqual(slug2)
  })
})

describe('parseSlug', () => {
  it('should recognize the correct streaming service for a Spotify slug', () => {
    const streamingService = parseSlug(
      StreamingServiceSlugPrefix.Spotify + '123',
    )
    expect(streamingService).toBe(StreamingService.Spotify)
  })

  it('should recognize the correct streaming service for an Apple slug', () => {
    const streamingService = parseSlug(StreamingServiceSlugPrefix.Apple + '123')
    expect(streamingService).toBe(StreamingService.Apple)
  })
})
