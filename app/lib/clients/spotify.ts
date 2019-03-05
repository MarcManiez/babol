import { Headers } from 'node-fetch'

import { StandardError } from '../../errors'
import { SearchResults, SearchResultType } from '../../types/spotify'
import { get, post } from '../requests'

export default class SpotifyClient {
  static async fetchTrack(id: string) {
    const headers = new Headers()
    const bearerToken = await SpotifyClient.getBearerToken()
    headers.append('Authorization', `Bearer ${bearerToken}`)
    return await get(`${SpotifyClient.url}tracks/${id}`, {
      headers,
    })
  }

  /**
   * Currently ignoring offset, market and include_external params
   *
   * @param query should be entered with single quotes or template literals
   * in order to support quotation marks in search
   */
  static async search(
    query: string,
    types: SearchResultType[],
    limit: number = 50,
  ): Promise<SearchResults> {
    const encodedQuery = encodeURI(query)
    const joinedTypes = types.join(',')
    const headers = new Headers()
    const bearerToken = await SpotifyClient.getBearerToken()
    headers.append('Authorization', `Bearer ${bearerToken}`)
    return await get(
      `${SpotifyClient.url}search?
        q=${encodedQuery}&
        type=${joinedTypes}&
        limit=${limit}`,
      { headers },
    )
  }

  private static bearerToken = null
  private static url = 'https://api.spotify.com/v1/'

  private static async getBearerToken() {
    if (this.bearerToken) {
      return this.bearerToken
    } else {
      return await SpotifyClient.fetchNewBearerToken()
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
