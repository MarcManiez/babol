import * as apple from '../../../app/domain/link_parsing/apple'
import { IdParsingError } from '../../../app/errors'
import { LinkType } from '../../../app/types/babol'
import * as links from '../../factories/links'

describe('getId', () => {
  it('should retrieve a song id given a valid form url', () => {
    const id = apple.getId(links.appleTrackUrl)
    expect(id).toBe('1254730420')
  })

  it('should retrieve a album id given a valid form url', () => {
    const id = apple.getId(links.appleAlbumUrl)
    expect(id).toBe('1254730401')
  })

  it('should retrieve an artist id given a valid form url', () => {
    const id = apple.getId(links.appleArtistUrl)
    expect(id).toBe('5421052')
  })

  it('should throw if the id could not be extracted', () => {
    expect(() => apple.getId('')).toThrow(IdParsingError)
  })
})

describe('getType', () => {
  it('should retrieve the track type given a track link', () => {
    const id = apple.getType(links.appleTrackUrl)
    expect(id).toBe(LinkType.Track)
  })

  it('should retrieve the track type given an album link', () => {
    const id = apple.getType(links.appleAlbumUrl)
    expect(id).toBe(LinkType.Album)
  })

  it('should retrieve the track type given an artist link', () => {
    const id = apple.getType(links.appleArtistUrl)
    expect(id).toBe(LinkType.Artist)
  })
})
