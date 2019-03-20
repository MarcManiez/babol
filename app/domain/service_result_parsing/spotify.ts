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
    scoredResults = searchResults.artists.items.map(artist =>
      scoreLinkPropertiesAndExtractLinkScoreCombo(
        sourceProperties,
        extractCoreLinkPropertiesFromSimplifiedArtist(artist),
        artist,
      ),
    )
  } else if (linkType === LinkType.Album) {
    if (!searchResults.albums || searchResults.albums.items.length === 0) {
      throw new Error(`Expected ${linkType} results but found none`)
    }
    scoredResults = searchResults.albums.items.map(album =>
      scoreLinkPropertiesAndExtractLinkScoreCombo(
        sourceProperties,
        extractCoreLinkPropertiesFromSimplifiedAlbum(album),
        album,
      ),
    )
  } else if (linkType === LinkType.Track) {
    if (!searchResults.tracks || searchResults.tracks.items.length === 0) {
      throw new Error(`Expected ${linkType} results but found none`)
    }
    scoredResults = searchResults.tracks.items.map(track =>
      scoreLinkPropertiesAndExtractLinkScoreCombo(
        sourceProperties,
        extractCoreLinkPropertiesFromTrack(track),
        track,
      ),
    )
  }
  return findBestMatch(scoredResults)
}

function scoreLinkPropertiesAndExtractLinkScoreCombo(
  coreLinkProperties1: CoreLinkProperties,
  coreLinkProperties2: CoreLinkProperties,
  spotifySearchResult: SimplifiedAlbum | SimplifiedArtist | Track,
): LinkScoreCombo {
  const score = scoreLinkPropertiesMatch(
    coreLinkProperties1,
    coreLinkProperties2,
  )
  const url = spotifySearchResult.href
  return { score, url }
}

export function extractCoreLinkProperties(
  fetchResult: FetchResult,
): CoreLinkProperties {
  if (fetchResult.artist) {
    return extractCoreLinkPropertiesFromSimplifiedArtist(fetchResult.artist)
  } else if (fetchResult.album) {
    return extractCoreLinkPropertiesFromSimplifiedAlbum(fetchResult.album)
  } else if (fetchResult.track) {
    return extractCoreLinkPropertiesFromTrack(fetchResult.track)
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
