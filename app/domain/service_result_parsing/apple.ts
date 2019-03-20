import {
  Artist,
  Collection,
  isArtist,
  isCollection,
  isTrack,
  SearchResult,
  Track,
} from '../../types/apple'
import { LinkType } from '../../types/babol'
import {
  CoreLinkProperties,
  findBestMatch,
  getLinkTypeForCoreLinkProperties,
  LinkScoreCombo,
  scoreLinkPropertiesMatch,
} from '../linkMatching'

export function extractLink(
  searchResults: SearchResult[],
  sourceProperties: CoreLinkProperties,
): LinkScoreCombo {
  let scoredResults: LinkScoreCombo[] = []
  const linkType = getLinkTypeForCoreLinkProperties(sourceProperties)
  if (linkType === LinkType.Artist) {
    const artistResults = searchResults.filter(isArtist)
    if (artistResults.length === 0) {
      throw new Error(`Expected ${linkType} results but found none`)
    }
    scoredResults = artistResults.map(artist =>
      scoreLinkPropertiesAndExtractLinkScoreCombo(
        sourceProperties,
        extractCoreLinkPropertiesFromArtist(artist),
        artist,
      ),
    )
  } else if (linkType === LinkType.Album) {
    const collectionResults = searchResults.filter(isCollection)
    if (collectionResults.length === 0) {
      throw new Error(`Expected ${linkType} results but found none`)
    }
    scoredResults = collectionResults.map(collection =>
      scoreLinkPropertiesAndExtractLinkScoreCombo(
        sourceProperties,
        extractCoreLinkPropertiesFromAlbum(collection),
        collection,
      ),
    )
  } else if (linkType === LinkType.Track) {
    const trackResults = searchResults.filter(isTrack)
    if (trackResults.length === 0) {
      throw new Error(`Expected ${linkType} results but found none`)
    }
    scoredResults = trackResults.map(track =>
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
  appleSearchResult: SearchResult,
): LinkScoreCombo {
  const score = scoreLinkPropertiesMatch(
    coreLinkProperties1,
    coreLinkProperties2,
  )
  let url: string
  if (isArtist(appleSearchResult)) {
    url = appleSearchResult.artistLinkUrl
  } else if (isCollection(appleSearchResult)) {
    url = appleSearchResult.collectionViewUrl
  } else if (isTrack(appleSearchResult)) {
    url = appleSearchResult.trackViewUrl
  } else {
    throw new Error(`Unknown search result type: ${appleSearchResult}`)
  }
  return { score, url }
}

export function extractCoreLinkProperties(
  appleSearchResult: SearchResult,
): CoreLinkProperties {
  if (isArtist(appleSearchResult)) {
    return extractCoreLinkPropertiesFromArtist(appleSearchResult)
  } else if (isCollection(appleSearchResult)) {
    return extractCoreLinkPropertiesFromAlbum(appleSearchResult)
  } else if (isTrack(appleSearchResult)) {
    return extractCoreLinkPropertiesFromTrack(appleSearchResult)
  } else {
    throw new Error(`Unknown search result type: ${appleSearchResult}`)
  }
}

function extractCoreLinkPropertiesFromArtist(
  artist: Artist,
): CoreLinkProperties {
  return { artist: artist.artistName }
}

function extractCoreLinkPropertiesFromAlbum(
  collection: Collection,
): CoreLinkProperties {
  const { artistName, collectionName } = collection
  if (!artistName) {
    throw new Error('Artist must be present for album')
  }
  return { album: collectionName, artist: artistName }
}

function extractCoreLinkPropertiesFromTrack(track: Track): CoreLinkProperties {
  if (!track.artistName) {
    throw new Error('Artist must be present for track')
  } else if (!track.collectionName) {
    throw new Error('Album must be present for track')
  }
  return {
    track: track.trackName,
    album: track.collectionName,
    artist: track.artistName,
  }
}
