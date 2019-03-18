export type SearchResultType = 'album' | 'artist' | 'playlist' | 'track'

export interface SearchResults {
  albums?: PagingObject<SimplifiedAlbum>
  artists?: PagingObject<Artist>
  playlists?: PagingObject<SimplifiedPlaylist>
  tracks?: PagingObject<Track>
}

type PagingObject<T> = {
  href: string
  items: T[]
  limit: number
  next: string | null
  offset: number
  previous: number | null
  total: number
}

export interface FetchResult {
  album?: Album
  artist?: Artist
  playlist?: SimplifiedPlaylist
  track?: Track
}

export interface SimplifiedAlbum {
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on'
  album_type: 'album' | 'single' | 'compilation'
  artists: SimplifiedArtist[]
  available_markets: string[]
  external_urls: ExternalUrl
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions?: Restrictions
  total_tracks: number
  type: 'album'
  uri: string
}

export type Album = SimplifiedAlbum & {
  copyrights: Copyright[]
  external_ids: ExternalId
  genres: string[]
  label: string
  popularity: number
  tracks: PagingObject<SimplifiedTrack>
}

export interface SimplifiedArtist {
  external_urls: ExternalUrl
  href: string
  id: string
  name: string
  type: 'artist'
  uri: string
}

export type Artist = SimplifiedArtist & {
  followers: Followers
  genres: string[]
  images: Image[]
  popularity: number
}

interface SimplifiedPlaylist {
  collaborative: boolean
  external_urls: ExternalUrl
  href: string
  id: string
  images: Image[]
  name: string
  owner: User
  primary_color: string | null
  public: boolean | null
  snapshot_id: string
  tracks: {
    href: string
    total: number
  }
  type: 'playlist'
  uri: string
}

interface SimplifiedTrack {
  artists: SimplifiedArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrl
  href: string
  id: string
  is_playable?: boolean
  linked_from?: TrackLink
  restrictions?: Restrictions
  name: string
  preview_url: string | null
  track_number: number
  type: 'track'
  uri: string
  is_local: boolean
}

export type Track = SimplifiedTrack & {
  album: SimplifiedAlbum
  external_ids: ExternalId
  popularity: number
}

interface ExternalUrl {
  spotify: string
}

interface Image {
  height: number | null
  url: string
  width: number | null
}

interface Restrictions {
  [reason: string]: string
}

interface Copyright {
  text: string
  type: 'C' | 'P'
}

interface ExternalId {
  isrc?: string
  ean?: string
  upc?: string
}

interface Followers {
  href: string | null
  total: number
}

interface TrackLink {
  external_urls: ExternalUrl
  href: string
  id: string
  type: string
  uri: string
}

interface User {
  display_name: string | null
  external_urls: ExternalUrl
  followers?: Followers
  href: string
  id: string
  images?: Image[]
  type: 'user'
  uri: string
}
