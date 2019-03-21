import distance from 'jaro-winkler'
import { LinkType } from '../types/babol'

export interface LinkScoreCombo {
  url: string
  score: number
}

export function findBestMatch(
  linkScoreCombos: LinkScoreCombo[],
): LinkScoreCombo {
  return linkScoreCombos.sort((a, b) => b.score - a.score)[0]
}

export interface CoreLinkProperties {
  [LinkType.Track]?: string
  [LinkType.Album]?: string
  [LinkType.Artist]: string
}

export function getLinkTypeForCoreLinkProperties(
  coreLinkProperties: CoreLinkProperties,
): LinkType {
  if (coreLinkProperties.track) {
    return LinkType.Track
  } else if (coreLinkProperties.album) {
    return LinkType.Album
  }
  return LinkType.Artist
}

export function scoreLinkPropertiesMatch(
  coreLinkProperties1: CoreLinkProperties,
  coreLinkProperties2: CoreLinkProperties,
): number {
  let globalScore = 0
  const artist1 = coreLinkProperties1.artist
  const album1 = coreLinkProperties1.album
  const track1 = coreLinkProperties1.track
  const artist2 = coreLinkProperties2.artist
  const album2 = coreLinkProperties2.album
  const track2 = coreLinkProperties2.track
  if ((track1 || track2) && !(track1 && track2)) {
    throw new Error(
      `Error comparing tracks: ${
        !track1 ? 'track2' : 'track1'
      } is empty or undefined`,
    )
  }
  if ((album1 || album2) && !(album1 && album2)) {
    throw new Error(
      `Error comparing albums: ${
        !album1 ? 'album2' : 'album1'
      } is empty or undefined`,
    )
  }
  const primaryAttributeMultiplier = 2
  if (track1 && track2 && album1 && album2) {
    globalScore +=
      distance(track1, track2, { caseSensitive: false }) *
      primaryAttributeMultiplier
    globalScore += distance(album1, album2, { caseSensitive: false })
    globalScore += distance(artist1, artist2, { caseSensitive: false })
  } else if (album1 && album2) {
    globalScore +=
      distance(album1, album2, { caseSensitive: false }) *
      primaryAttributeMultiplier
    globalScore += distance(artist1, artist2, { caseSensitive: false })
  } else {
    globalScore +=
      distance(artist1, artist2, { caseSensitive: false }) *
      primaryAttributeMultiplier
  }
  return globalScore
}
