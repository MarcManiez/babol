import { scoreLinkPropertiesMatch } from '../../app/domain/linkMatching'

describe('scoreLinkPropertiesMatch', () => {
  it('should throw if only one of the two inputs have an album', () => {
    const coreLinkProperties1 = { artist: 'artist', album: 'album' }
    const coreLinkProperties2 = { artist: 'artist' }
    expect(() =>
      scoreLinkPropertiesMatch(coreLinkProperties1, coreLinkProperties2),
    ).toThrow()
  })

  it('should throw if only one of the two inputs have a track', () => {
    const coreLinkProperties1 = {
      artist: 'artist',
      album: 'album',
      track: 'track',
    }
    const coreLinkProperties2 = { artist: 'artist', album: 'album' }
    expect(() =>
      scoreLinkPropertiesMatch(coreLinkProperties1, coreLinkProperties2),
    ).toThrow()
  })
})
