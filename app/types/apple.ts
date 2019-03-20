import { LinkType } from './babol'

export interface SearchResults<T = SearchResult> {
  resultCount: number
  results: T[]
}

export type SearchResult = Track | Collection | Artist

export const babolLinkTypeToAppleResultType = {
  [LinkType.Track]: 'track',
  [LinkType.Album]: 'collection',
  [LinkType.Artist]: 'artist',
}

export const babolLinkTypeToAppleSearchTypes = {
  [LinkType.Track]: ['musicTrack', 'song'],
  [LinkType.Album]: ['album'],
  [LinkType.Artist]: ['musicArtist'],
}

export interface Track {
  wrapperType: 'track'
  kind: 'book' | 'music-video' | 'pdf' | 'podcast-episode' | 'song'
  artistId: number
  collectionId: number
  trackId: number
  artistName: string
  collectionName: string
  trackName: string
  collectionCensoredName: string
  trackCensoredName: string
  artistViewUrl: string
  collectionViewUrl: string
  trackViewUrl: string
  previewUrl: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
  collectionPrice: number
  trackPrice: number
  releaseDate: string
  collectionExplicitness: Explicitness
  trackExplicitness: Explicitness
  discCount: number
  discNumber: number
  trackCount: number
  trackNumber: number
  trackTimeMillis: number
  country: string
  currency: string
  primaryGenreName: string
  isStreamable: boolean
}

export interface Collection {
  wrapperType: 'collection'
  collectionType: string
  artistId: number
  collectionId: number
  amgArtistId: number
  artistName: string
  collectionName: string
  collectionCensoredName: string
  artistViewUrl: string
  collectionViewUrl: string
  artworkUrl60: string
  artworkUrl100: string
  collectionPrice: number
  collectionExplicitness: Explicitness
  trackCount: number
  copyright: string
  country: string
  currency: string
  releaseDate: string
  primaryGenreName: string
}

export interface Artist {
  wrapperType: 'artist'
  artistType: string
  artistName: string
  artistLinkUrl: string
  artistId: number
  amgArtistId: number
  primaryGenreName: string
  primaryGenreId: number
}

type Explicitness = 'explicit' | 'cleaned' | 'notExplicit'

export function isTrack(searchResult: SearchResult): searchResult is Track {
  return searchResult.wrapperType === 'track'
}

export function isCollection(
  searchResult: SearchResult,
): searchResult is Collection {
  return searchResult.wrapperType === 'collection'
}

export function isArtist(searchResult: SearchResult): searchResult is Artist {
  return searchResult.wrapperType === 'artist'
}
