import { detectStreamingService } from '../../../app/domain/link_parsing/general'
import { UnknownStreamingServiceError } from '../../../app/errors'
import { StreamingService } from '../../../app/types'
import * as links from '../../factories/links'

describe('detectStreamingService', () => {
  it('should correctly detect valid apple short links', () => {
    const service = detectStreamingService(links.appleShortUrl)
    expect(service).toBe(StreamingService.Apple)
  })

  it('should correctly detect valid apple long links', () => {
    const service = detectStreamingService(links.appleAlbumUrl)
    expect(service).toBe(StreamingService.Apple)
  })

  it('should correctly detect valid play.spotify links', () => {
    const service = detectStreamingService(links.spotifyPlayUrl)
    expect(service).toBe(StreamingService.Spotify)
  })

  it('should correctly detect valid open.spotify links', () => {
    const service = detectStreamingService(links.spotifyAlbumUrl)
    expect(service).toBe(StreamingService.Spotify)
  })

  it('should correctly detect valid spotify URIs', () => {
    const service = detectStreamingService(links.spotifyArtistUri)
    expect(service).toBe(StreamingService.Spotify)
  })

  it('should correctly detect invalid links and throw', () => {
    expect(() =>
      detectStreamingService('not even close to being a link'),
    ).toThrow(UnknownStreamingServiceError)
  })
})
