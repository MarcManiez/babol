import { FetchResult } from '../../types/spotify'
import { CoreLinkProperties } from '../linkMatching'

export function extractCoreLinkProperties(
  fetchResults: FetchResult,
): CoreLinkProperties {
  if (fetchResults.artist) {
    return { artist: fetchResults.artist.name }
  } else if (fetchResults.album) {
    const { artists, name } = fetchResults.album
    const groupedArtists = artists.map(artist => artist.name).join(', ')
    if (!groupedArtists) {
      throw new Error('Artist must be present for album')
    }
    return { album: name, artist: groupedArtists }
  } else if (fetchResults.track) {
    /**
     * We are choosing to take the artist from the album, and not from the track
     * despite the primary attribute being the track because tracks can include
     * a long list of artists (eg. featurings), and searching for a long list of
     * artists on various APIs can narrow search results significantly.
     *
     * We want our searching to be greedy, ie. get the most results, and then
     * use our own heuristics to determine the best match.
     */
    const groupedArtists = fetchResults.track.album.artists
      .map(artist => artist.name)
      .join(', ')
    if (!groupedArtists) {
      throw new Error('Artist must be present for track')
    }
    const album = fetchResults.track.album.name
    if (!album) {
      throw new Error('Album must be present for track')
    }
    return { track: fetchResults.track.name, album, artist: groupedArtists }
  }
  throw new Error('Unrecognized search result type.')
}

// given a set of search results and an index, return a CoreLinkProperties type

// given a set of search results, return a link

// given a set of search results, return a list of [index, score] tuples

// given a search result, reutnr a link
