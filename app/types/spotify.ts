export type SearchResultType = 'album' | 'artist' | 'playlist' | 'track'

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

type PagingObject<T> = {
  href: string
  items: T[]
  limit: number
  next: string | null
  offset: number
  previous: number | null
  total: number
}

interface SimplifiedAlbum {
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

type Album = SimplifiedAlbum & {
  copyrights: Copyright[]
  external_ids: ExternalId[]
  genres: string[]
  label: string
  popularity: number
  tracks: Array<PagingObject<SimplifiedTrack>>
}

interface SimplifiedArtist {
  external_urls: ExternalUrl
  href: string
  id: string
  name: string
  type: 'artist'
  uri: string
}

type Artist = SimplifiedArtist & {
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
  preview_url: string
  track_number: number
  type: 'track'
  uri: string
  is_local: boolean
}

type Track = SimplifiedTrack & {
  album: SimplifiedAlbum
  external_ids: ExternalId
  popularity: number
}

export interface SearchResults {
  albums?: PagingObject<SimplifiedAlbum>
  artists?: PagingObject<Artist>
  playlists?: PagingObject<SimplifiedPlaylist>
  tracks?: PagingObject<Track>
}

const lol: SearchResults = {
  albums: {
    href:
      'https://api.spotify.com/v1/search?query=test&type=album&offset=0&limit=1',
    items: [
      {
        album_type: 'album',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/5VX8hxrcfJWwaTLiqGUHG3',
            },
            href: 'https://api.spotify.com/v1/artists/5VX8hxrcfJWwaTLiqGUHG3',
            id: '5VX8hxrcfJWwaTLiqGUHG3',
            name: 'TobyMac',
            type: 'artist',
            uri: 'spotify:artist:5VX8hxrcfJWwaTLiqGUHG3',
          },
        ],
        available_markets: [
          'AD',
          'AR',
          'AT',
          'AU',
          'BE',
          'BG',
          'BO',
          'BR',
          'CA',
          'CH',
          'CL',
          'CO',
          'CR',
          'CY',
          'CZ',
          'DE',
          'DK',
          'DO',
          'EC',
          'EE',
          'ES',
          'FI',
          'FR',
          'GB',
          'GR',
          'GT',
          'HK',
          'HN',
          'HU',
          'ID',
          'IE',
          'IL',
          'IN',
          'IS',
          'IT',
          'JP',
          'LI',
          'LT',
          'LU',
          'LV',
          'MC',
          'MT',
          'MX',
          'MY',
          'NI',
          'NL',
          'NO',
          'NZ',
          'PA',
          'PE',
          'PH',
          'PL',
          'PT',
          'PY',
          'RO',
          'SE',
          'SG',
          'SK',
          'SV',
          'TH',
          'TR',
          'TW',
          'US',
          'UY',
          'VN',
          'ZA',
        ],
        external_urls: {
          spotify: 'https://open.spotify.com/album/5cv2FBz4B4x0WpAjMSI1UG',
        },
        href: 'https://api.spotify.com/v1/albums/5cv2FBz4B4x0WpAjMSI1UG',
        id: '5cv2FBz4B4x0WpAjMSI1UG',
        images: [
          {
            height: 640,
            url:
              'https://i.scdn.co/image/10df0855decc23d7b546c12bdf9bc0a2feab24f6',
            width: 640,
          },
          {
            height: 300,
            url:
              'https://i.scdn.co/image/93c85e637b7df27b60fdbbad79fb25754938b18c',
            width: 300,
          },
          {
            height: 64,
            url:
              'https://i.scdn.co/image/0652e7eb1be77aadf1f3d37288741c59a453e113',
            width: 64,
          },
        ],
        name: 'This Is Not A Test',
        release_date: '2015-08-07',
        release_date_precision: 'day',
        total_tracks: 11,
        type: 'album',
        uri: 'spotify:album:5cv2FBz4B4x0WpAjMSI1UG',
      },
    ],
    limit: 1,
    next:
      'https://api.spotify.com/v1/search?query=test&type=album&offset=1&limit=1',
    offset: 0,
    previous: null,
    total: 2002,
  },
  tracks: {
    href:
      'https://api.spotify.com/v1/search?query=test&type=track&offset=0&limit=1',
    items: [
      {
        album: {
          album_type: 'album',
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq',
              },
              href: 'https://api.spotify.com/v1/artists/3MZsBdqDrRTJihTHQrO6Dq',
              id: '3MZsBdqDrRTJihTHQrO6Dq',
              name: 'Joji',
              type: 'artist',
              uri: 'spotify:artist:3MZsBdqDrRTJihTHQrO6Dq',
            },
          ],
          available_markets: [
            'AD',
            'AE',
            'AR',
            'AT',
            'AU',
            'BE',
            'BG',
            'BH',
            'BO',
            'BR',
            'CA',
            'CH',
            'CL',
            'CO',
            'CR',
            'CY',
            'CZ',
            'DE',
            'DK',
            'DO',
            'DZ',
            'EC',
            'EE',
            'EG',
            'ES',
            'FI',
            'FR',
            'GB',
            'GR',
            'GT',
            'HK',
            'HN',
            'HU',
            'ID',
            'IE',
            'IL',
            'IS',
            'IT',
            'JO',
            'JP',
            'KW',
            'LB',
            'LI',
            'LT',
            'LU',
            'LV',
            'MA',
            'MC',
            'MT',
            'MX',
            'MY',
            'NI',
            'NL',
            'NO',
            'NZ',
            'OM',
            'PA',
            'PE',
            'PH',
            'PL',
            'PS',
            'PT',
            'PY',
            'QA',
            'RO',
            'SA',
            'SE',
            'SG',
            'SK',
            'SV',
            'TH',
            'TN',
            'TR',
            'TW',
            'US',
            'UY',
            'VN',
            'ZA',
          ],
          external_urls: {
            spotify: 'https://open.spotify.com/album/34GQP3dILpyCN018y2k61L',
          },
          href: 'https://api.spotify.com/v1/albums/34GQP3dILpyCN018y2k61L',
          id: '34GQP3dILpyCN018y2k61L',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/e67136d00b23acc1b57414c419c47755a9a8280b',
              width: 640,
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/288d6426dbdf9960d797ae345b09204874b476ca',
              width: 300,
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/1d828085e1ba97a564dcdad94373023eff8b02ca',
              width: 64,
            },
          ],
          name: 'BALLADS 1',
          release_date: '2018-10-26',
          release_date_precision: 'day',
          total_tracks: 12,
          type: 'album',
          uri: 'spotify:album:34GQP3dILpyCN018y2k61L',
        },
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq',
            },
            href: 'https://api.spotify.com/v1/artists/3MZsBdqDrRTJihTHQrO6Dq',
            id: '3MZsBdqDrRTJihTHQrO6Dq',
            name: 'Joji',
            type: 'artist',
            uri: 'spotify:artist:3MZsBdqDrRTJihTHQrO6Dq',
          },
        ],
        available_markets: [
          'AD',
          'AE',
          'AR',
          'AT',
          'AU',
          'BE',
          'BG',
          'BH',
          'BO',
          'BR',
          'CA',
          'CH',
          'CL',
          'CO',
          'CR',
          'CY',
          'CZ',
          'DE',
          'DK',
          'DO',
          'DZ',
          'EC',
          'EE',
          'EG',
          'ES',
          'FI',
          'FR',
          'GB',
          'GR',
          'GT',
          'HK',
          'HN',
          'HU',
          'ID',
          'IE',
          'IL',
          'IS',
          'IT',
          'JO',
          'JP',
          'KW',
          'LB',
          'LI',
          'LT',
          'LU',
          'LV',
          'MA',
          'MC',
          'MT',
          'MX',
          'MY',
          'NI',
          'NL',
          'NO',
          'NZ',
          'OM',
          'PA',
          'PE',
          'PH',
          'PL',
          'PS',
          'PT',
          'PY',
          'QA',
          'RO',
          'SA',
          'SE',
          'SG',
          'SK',
          'SV',
          'TH',
          'TN',
          'TR',
          'TW',
          'US',
          'UY',
          'VN',
          'ZA',
        ],
        disc_number: 1,
        duration_ms: 179423,
        explicit: true,
        external_ids: {
          isrc: 'ZZOPM1800561',
        },
        external_urls: {
          spotify: 'https://open.spotify.com/track/1DMEzmAoQIikcL52psptQL',
        },
        href: 'https://api.spotify.com/v1/tracks/1DMEzmAoQIikcL52psptQL',
        id: '1DMEzmAoQIikcL52psptQL',
        is_local: false,
        name: 'TEST DRIVE',
        popularity: 77,
        preview_url:
          'https://p.scdn.co/mp3-preview/c7d8c051043d53a2ecd3aba7916cec3860456454?cid=8c6059f46214412f83f7aad15ff312f4',
        track_number: 3,
        type: 'track',
        uri: 'spotify:track:1DMEzmAoQIikcL52psptQL',
      },
    ],
    limit: 1,
    next:
      'https://api.spotify.com/v1/search?query=test&type=track&offset=1&limit=1',
    offset: 0,
    previous: null,
    total: 21438,
  },
  playlists: {
    href:
      'https://api.spotify.com/v1/search?query=test&type=playlist&offset=0&limit=1',
    items: [
      {
        collaborative: false,
        external_urls: {
          spotify: 'https://open.spotify.com/playlist/37i9dQZF1DWZtZ8vUCzche',
        },
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWZtZ8vUCzche',
        id: '37i9dQZF1DWZtZ8vUCzche',
        images: [
          {
            height: null,
            url:
              'https://pl.scdn.co/images/pl/default/9679390f7a3a04bc3b8d9cd2b1b4f25035fe0938',
            width: null,
          },
        ],
        name: 'Songs To Test Headphones With',
        owner: {
          display_name: 'Spotify',
          external_urls: {
            spotify: 'https://open.spotify.com/user/spotify',
          },
          href: 'https://api.spotify.com/v1/users/spotify',
          id: 'spotify',
          type: 'user',
          uri: 'spotify:user:spotify',
        },
        primary_color: null,
        public: null,
        snapshot_id:
          'MTU0ODc1MTM0MSwwMDAwMDAyMzAwMDAwMTYwNTFkMmFjM2YwMDAwMDE2ODk4YzYwNzM0',
        tracks: {
          href:
            'https://api.spotify.com/v1/playlists/37i9dQZF1DWZtZ8vUCzche/tracks',
          total: 150,
        },
        type: 'playlist',
        uri: 'spotify:playlist:37i9dQZF1DWZtZ8vUCzche',
      },
    ],
    limit: 1,
    next:
      'https://api.spotify.com/v1/search?query=test&type=playlist&offset=1&limit=1',
    offset: 0,
    previous: null,
    total: 29377,
  },
}
