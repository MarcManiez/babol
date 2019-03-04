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
  isrc: string
  ean: string
  upc: string
}

type PagingObject<T> = {
  href: string
  items: T[]
  limit: number
  next: string | null
  offset: number
  previous: number | null
  total: string
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
  placeholder: 'asdf'
}

interface SimplifiedTrack {
  placeholder: 'asdf'
}

const lol = {
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
    total: 2003,
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
    total: 21418,
  },
}
