import * as spotify from '../../../app/domain/link_parsing/spotify'

describe('getId', () => {
  it('should retrieve a song id given a valid form url', () => {
    const id = spotify.getId('https://open.spotify.com/track/45yEy5WJywhJ3sDI2')
    expect(id).toBe('45yEy5WJywhJ3sDI2')
  })

  it('should retrieve a album id given a valid form url', () => {
    const id = spotify.getId('https://open.spotify.com/album/5XfJmldgWzrc1AIdb')
    expect(id).toBe('5XfJmldgWzrc1AIdb')
  })

  it('should retrieve an artist id given a valid form url', () => {
    const id = spotify.getId('https://open.spotify.com/artist/3WrFJ7ztbogyGnTH')
    expect(id).toBe('3WrFJ7ztbogyGnTH')
  })

  it('should return null if the id could not be extracted', () => {
    const id = spotify.getId(
      'https://itunes.apple.com/us/artist/aaron-goldberg/id5421052/',
    )
    expect(id).toBe(null)
  })
})

describe('getType', () => {
  it('should retrieve the track type given a track link', () => {
    const id = spotify.getType('https://open.spotify.com/track/45yEy5WJywhJ3sD')
    expect(id).toBe(spotify.LinkType.Track)
  })

  it('should retrieve the track type given a track link', () => {
    const id = spotify.getType('https://open.spotify.com/album/45yEy5WJywhJ3sD')
    expect(id).toBe(spotify.LinkType.Album)
  })

  it('should retrieve the track type given a track link', () => {
    const id = spotify.getType('https://open.spotify.com/artist/45yEy5WJywhJ3s')
    expect(id).toBe(spotify.LinkType.Artist)
  })
})
