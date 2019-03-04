import * as spotify from '../../../app/domain/link_parsing/spotify'
import { IdParsingError } from '../../../app/errors'
import { LinkType } from '../../../app/types/babol'
import * as links from '../../factories/links'

describe('getId', () => {
  it('should retrieve a song id given a valid form url', () => {
    const id = spotify.getId(links.spotifyTrackUrl)
    expect(id).toBe('2sJp0csowWQf3sVX7EAffq')
  })

  it('should retrieve a album id given a valid form url', () => {
    const id = spotify.getId(links.spotifyAlbumUrl)
    expect(id).toBe('6M0IAJHwQ6dFNtTkFsXCJc')
  })

  it('should retrieve an artist id given a valid form url', () => {
    const id = spotify.getId(links.spotifyArtistUrl)
    expect(id).toBe('0BTfBwYC5Mw5ezDg91JBma')
  })

  it('should throw if the id could not be extracted', () => {
    expect(() => spotify.getId('https://open.spotify.com/track')).toThrow(
      IdParsingError,
    )
  })
})

describe('getType', () => {
  it('should retrieve the track type given a track link', () => {
    const id = spotify.getType(links.spotifyTrackUrl)
    expect(id).toBe(LinkType.Track)
  })

  it('should retrieve the track type given an album link', () => {
    const id = spotify.getType(links.spotifyAlbumUrl)
    expect(id).toBe(LinkType.Album)
  })

  it('should retrieve the track type given an artist link', () => {
    const id = spotify.getType(links.spotifyArtistUrl)
    expect(id).toBe(LinkType.Artist)
  })
})
