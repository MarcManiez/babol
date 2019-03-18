import { LinkType } from '../../types/babol'
import {
  FetchResult,
  SearchResults,
  SimplifiedAlbum,
  SimplifiedArtist,
  Track,
} from '../../types/spotify'
import {
  CoreLinkProperties,
  findBestMatch,
  getLinkTypeForCoreLinkProperties,
  LinkScoreCombo,
  scoreLinkPropertiesMatch,
} from '../linkMatching'

export function extractLink(
  searchResults: SearchResults,
  sourceProperties: CoreLinkProperties,
): LinkScoreCombo {
  let scoredResults: LinkScoreCombo[] = []
  const linkType = getLinkTypeForCoreLinkProperties(sourceProperties)
  if (linkType === LinkType.Artist) {
    if (!searchResults.artists || searchResults.artists.items.length === 0) {
      throw new Error(`Expected ${linkType} results but found none`)
    }
    scoredResults = searchResults.artists.items.map(artist => {
      const artistProperties = extractCoreLinkPropertiesFromSimplifiedArtist(
        artist,
      )
      const score = scoreLinkPropertiesMatch(sourceProperties, artistProperties)
      const url = artist.href
      return { score, url }
    })
  } else if (linkType === LinkType.Album) {
    if (!searchResults.albums || searchResults.albums.items.length === 0) {
      throw new Error(`Expected ${linkType} results but found none`)
    }
    scoredResults = searchResults.albums.items.map(album => {
      const albumProperties = extractCoreLinkPropertiesFromSimplifiedAlbum(
        album,
      )
      const score = scoreLinkPropertiesMatch(sourceProperties, albumProperties)
      const url = album.href
      return { score, url }
    })
  } else if (linkType === LinkType.Track) {
    if (!searchResults.tracks || searchResults.tracks.items.length === 0) {
      throw new Error(`Expected ${linkType} results but found none`)
    }
    scoredResults = searchResults.tracks.items.map(track => {
      const trackProperties = extractCoreLinkPropertiesFromTrack(track)
      const score = scoreLinkPropertiesMatch(sourceProperties, trackProperties)
      const url = track.href
      return { score, url }
    })
  }
  return findBestMatch(scoredResults)
}

export function extractCoreLinkProperties(
  fetchResults: FetchResult,
): CoreLinkProperties {
  if (fetchResults.artist) {
    return extractCoreLinkPropertiesFromSimplifiedArtist(fetchResults.artist)
  } else if (fetchResults.album) {
    return extractCoreLinkPropertiesFromSimplifiedAlbum(fetchResults.album)
  } else if (fetchResults.track) {
    return extractCoreLinkPropertiesFromTrack(fetchResults.track)
  }
  throw new Error('Unrecognized search result type.')
}

function extractCoreLinkPropertiesFromSimplifiedArtist(
  simplifiedArtist: SimplifiedArtist,
): CoreLinkProperties {
  return { artist: simplifiedArtist.name }
}

function extractCoreLinkPropertiesFromSimplifiedAlbum(
  simplifiedAlbum: SimplifiedAlbum,
): CoreLinkProperties {
  const { artists, name } = simplifiedAlbum
  const groupedArtists = artists.map(artist => artist.name).join(', ')
  if (!groupedArtists) {
    throw new Error('Artist must be present for album')
  }
  return { album: name, artist: groupedArtists }
}

function extractCoreLinkPropertiesFromTrack(
  simplifiedTrack: Track,
): CoreLinkProperties {
  /**
   * We are choosing to take the artist from the album, and not from the track
   * despite the primary attribute being the track because tracks can include
   * a long list of artists (eg. featurings), and searching for a long list of
   * artists on various APIs can narrow search results significantly.
   *
   * We want our searching to be greedy, ie. get the most results, and then
   * use our own heuristics to determine the best match.
   */
  const groupedArtists = simplifiedTrack.album.artists
    .map(artist => artist.name)
    .join(', ')
  if (!groupedArtists) {
    throw new Error('Artist must be present for track')
  }
  const album = simplifiedTrack.album.name
  if (!album) {
    throw new Error('Album must be present for track')
  }
  return { track: simplifiedTrack.name, album, artist: groupedArtists }
}
