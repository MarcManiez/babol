import {
  babolLinkTypeToAppleResultType,
  babolLinkTypeToAppleSearchTypes,
  SearchResults,
} from '../../types/apple'
import { LinkType } from '../../types/babol'
import { get } from '../requests'

const url = 'https://itunes.apple.com/'

/**
 * Returning a promise isn't technically needed, but it's useful to keep the
 * interface parity with fetch methods of other clients.
 */
export async function fetch(type: LinkType, id: string) {
  const response = (await get(`${url}lookup?id=${id}`)) as SearchResults
  const result = response.results[0]
  const expectedWrapperType = babolLinkTypeToAppleResultType[type]
  if (result.wrapperType === expectedWrapperType) {
    return result
  }
  throw new Error(
    `Unexpected wrapperType type. Expected ${expectedWrapperType}, got ${
      result.wrapperType
    }`,
  )
}

/**
 * @param query should be entered with single quotes or template literals
 * in order to support quotation marks in search
 */
export async function search(query: string, types: LinkType[], limit = 200) {
  const encodedQuery = encodeURI(query)
  const convertedTypes = types.map(
    type => babolLinkTypeToAppleSearchTypes[type],
  )
  const flattenedConvertedTypes: string[] = []
  convertedTypes.forEach(convertedType =>
    flattenedConvertedTypes.push(...convertedType),
  )
  const joinedTypes = flattenedConvertedTypes.join(',')
  const response = await get(
    `${url}search?media=music&term=${encodedQuery}&entity=${joinedTypes}&limit=${limit}`,
  )
  return JSON.parse(response).results
}
