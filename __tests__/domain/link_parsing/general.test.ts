import {
  detectStreamingService,
  StreamingService,
} from '../../../app/domain/link_parsing/general'

describe('detectStreamingService', () => {
  it('should correctly detect valid apple links', () => {
    const service = detectStreamingService('https://itun.es/us/8FRu')
    expect(service).toBe(StreamingService.Apple)
  })

  it('should correctly detect valid play.spotify links', () => {
    const service = detectStreamingService(
      'https://play.spotify.com/artist/0BTfBwYC5Mw5ezDg91JBma',
    )
    expect(service).toBe(StreamingService.Spotify)
  })

  it('should correctly detect valid open.spotify links', () => {
    const service = detectStreamingService(
      'https://open.spotify.com/track/4JehYebiI9JE8sR8MisGVb',
    )
    expect(service).toBe(StreamingService.Spotify)
  })

  it('should correctly detect valid spotify URIs', () => {
    const service = detectStreamingService(
      'spotify:artist:5olDKSsFhhmwh8UCWwKtpq',
    )
    expect(service).toBe(StreamingService.Spotify)
  })

  it('should correctly detect invalid links', () => {
    expect(detectStreamingService('not even close to being a link')).toBe(null)
  })
})
