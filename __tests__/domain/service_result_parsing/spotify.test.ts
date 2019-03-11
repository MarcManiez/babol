import { extractCoreLinkProperties } from '../../../app/domain/service_result_parsing/spotify'
import {
  spotifyAlbum,
  spotifyArtist,
  spotifyTrack,
} from '../../factories/service_results/spotify.test'

describe('extractCoreLinkProperties', () => {
  describe('track', () => {
    it('should return a core link property object with all attributes', () => {
      const coreLinkProperties = extractCoreLinkProperties({
        track: spotifyTrack,
      })
      expect(coreLinkProperties).toEqual({
        track: spotifyTrack.name,
        album: spotifyTrack.album.name,
        artist: spotifyTrack.album.artists.map(({ name }) => name).join(', '),
      })
    })
  })

  describe('album', () => {
    it('should return a core link property object album and artist attributes', () => {
      const coreLinkProperties = extractCoreLinkProperties({
        album: spotifyAlbum,
      })
      expect(coreLinkProperties).toEqual({
        album: spotifyAlbum.name,
        artist: spotifyAlbum.artists.map(({ name }) => name).join(', '),
      })
    })
  })

  describe('artist', () => {
    it('should return a core link property object with an artist attribute', () => {
      const coreLinkProperties = extractCoreLinkProperties({
        artist: spotifyArtist,
      })
      expect(coreLinkProperties).toEqual({ artist: spotifyArtist.name })
    })
  })
})
