import { Headers } from 'node-fetch'

import { StandardError } from '../../errors'
import { LinkType } from '../../types/babol'
import {
  babolLinkTypeToSpotifyResultType,
  FetchResult,
  SearchResults,
} from '../../types/spotify'
import { get, post } from '../requests'

// TODO: make this a regular module, not a class and redo bearer token getter
export default class SpotifyClient {
  /**
   * Currently ignoring offset, market and include_external params
   *
   * @param query should be entered with single quotes or template literals
   * in order to support quotation marks in search
   */
  static async search(
    query: string,
    types: LinkType[],
    limit: number = 50,
  ): Promise<SearchResults> {
    const encodedQuery = encodeURI(query)
    const convertedTypes = types.map(
      type => babolLinkTypeToSpotifyResultType[type],
    )
    const joinedTypes = convertedTypes.join(',')
    const headers = new Headers()
    const bearerToken = await SpotifyClient.getBearerToken()
    headers.append('Authorization', `Bearer ${bearerToken}`)
    return get(
      `${
        SpotifyClient.url
      }search?q=${encodedQuery}&type=${joinedTypes}&limit=${limit}`,
      { headers },
    )
  }

  static async fetch(type: LinkType, id: string): Promise<FetchResult> {
    const headers = new Headers()
    const bearerToken = await SpotifyClient.getBearerToken()
    headers.append('Authorization', `Bearer ${bearerToken}`)
    return get(`${SpotifyClient.url}${type}s/${id}`, { headers })
  }

  private static bearerToken = null
  private static url = 'https://api.spotify.com/v1/'

  private static async getBearerToken() {
    if (this.bearerToken) {
      return this.bearerToken
    } else {
      return SpotifyClient.fetchNewBearerToken()
    }
  }

  private static get authorizationHeaderValue() {
    const clientCredentials = `${process.env.SPOTIFY_CLIENT_ID}:${
      process.env.SPOTIFY_CLIENT_SECRET
    }`
    return Buffer.from(clientCredentials).toString('base64')
  }

  private static async fetchNewBearerToken() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers.append(
      'Authorization',
      `Basic ${SpotifyClient.authorizationHeaderValue}`,
    )
    const body = 'grant_type=client_credentials'
    const response = await post('https://accounts.spotify.com/api/token', {
      headers,
      body,
    })
    if (response && response.access_token) {
      return response.access_token
    } else {
      throw new StandardError('Error fetching bearer token', response)
    }
  }
}
