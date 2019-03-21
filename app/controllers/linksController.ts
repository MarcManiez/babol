import { Request, Response } from 'express-serve-static-core'
import { getConnection } from 'typeorm'

import * as AppleLinkParsing from '../domain/link_parsing/apple'
import { detectStreamingService } from '../domain/link_parsing/general'
import * as SpotifyLinkParsing from '../domain/link_parsing/spotify'
import * as AppleResultParsing from '../domain/service_result_parsing/apple'
import * as SpotifyResultParsing from '../domain/service_result_parsing/spotify'
import { parseSlug } from '../domain/slugs'
import {
  MissingParamsError,
  SlugParsingError,
  UnknownStreamingServiceError,
} from '../errors'
import * as AppleClient from '../lib/clients/apple'
import { coreLinkPropertiesToSearchQuery } from '../lib/clients/helpers'
import SpotifyClient from '../lib/clients/spotify'
import AppleLinkCollection from '../models/AppleLinkCollection'
import SpotifyLinkCollection from '../models/SpotifyLinkCollection'
import { StreamingService } from '../types/babol'

export async function get(req: Request, res: Response) {
  try {
    const { slug } = req.params
    if (!slug) {
      throw new MissingParamsError(['slug'])
    }
    const streamingService = parseSlug(slug)
    let linkCollection
    if (streamingService === StreamingService.Apple) {
      const connection = getConnection()
      const repository = connection.getRepository(AppleLinkCollection)
      linkCollection = await repository.findOne({ slug })
    } else if (streamingService === StreamingService.Spotify) {
      const connection = getConnection()
      const repository = connection.getRepository(SpotifyLinkCollection)
      linkCollection = await repository.findOne({ slug })
    }
    if (!linkCollection) {
      return res.status(404).send({ error: 'slug not found' })
    }
    res.render('link', { streamingService, linkCollection })
  } catch (error) {
    if (
      error instanceof MissingParamsError ||
      error instanceof SlugParsingError
    ) {
      return res.status(422).send({ error: error.message })
    } else {
      throw error
    }
  }
}

export async function post(req: Request, res: Response) {
  const { link } = req.body
  try {
    const host = req.headers && req.headers.host
    const streamingService = detectStreamingService(link)
    const connection = getConnection()
    if (streamingService === StreamingService.Apple) {
      const id = AppleLinkParsing.getId(link)
      const repository = connection.getRepository(AppleLinkCollection)
      let appleLinkCollection = await repository.findOne({ sourceId: id })
      if (!appleLinkCollection) {
        appleLinkCollection = new AppleLinkCollection(link)
        appleLinkCollection = await repository.save(appleLinkCollection)
      }
      if (!appleLinkCollection.spotifyLink) {
        // Spin off worker to fetch song from spotify
        // Careful with this: if for some reason the song can't ever be found,
        // we'll be making requests forever for nothing
      }
      return res.json({
        babol_link: host && host + appleLinkCollection.babolLinkPath(),
      })
    } else if (streamingService === StreamingService.Spotify) {
      const id = SpotifyLinkParsing.getId(link)
      const repository = connection.getRepository(SpotifyLinkCollection)
      const type = SpotifyLinkParsing.getType(link)
      let spotifyLinkCollection = await repository.findOne({ sourceId: id })
      if (!spotifyLinkCollection) {
        spotifyLinkCollection = new SpotifyLinkCollection(link)
        spotifyLinkCollection = await repository.save(spotifyLinkCollection)
      }
      if (!spotifyLinkCollection.appleLink) {
        const result = await SpotifyClient.fetch(type, id)
        const coreLinkProperties = SpotifyResultParsing.extractCoreLinkProperties(
          result,
        )
        const results = await AppleClient.search(
          coreLinkPropertiesToSearchQuery(coreLinkProperties),
          [type],
        )
        const bestMatch = AppleResultParsing.extractLink(
          results,
          coreLinkProperties,
        )
        spotifyLinkCollection.appleLink = bestMatch.url
        spotifyLinkCollection.artist = coreLinkProperties.artist
        if (coreLinkProperties.album) {
          spotifyLinkCollection.album = coreLinkProperties.album
        }
        if (coreLinkProperties.artist) {
          spotifyLinkCollection.artist = coreLinkProperties.artist
        }
        await repository.save(spotifyLinkCollection)
      }
      return res.json({
        babol_link: host && host + spotifyLinkCollection.babolLinkPath(),
      })
    }
  } catch (error) {
    if (error instanceof UnknownStreamingServiceError || !link) {
      return res.status(422).send({ error: error.message })
    } else {
      throw error
    }
  }
}
