import { Request, Response } from 'express-serve-static-core'
import { getConnection } from 'typeorm'

import * as AppleLinkParsing from '../domain/link_parsing/apple'
import { detectStreamingService } from '../domain/link_parsing/general'
import * as SpotifyLinkParsing from '../domain/link_parsing/spotify'
import { UnknownStreamingServiceError } from '../errors'
import AppleLinkCollection from '../models/AppleLinkCollection'
import SpotifyLinkCollection from '../models/SpotifyLinkCollection'
import { StreamingService } from '../types'

export async function post(req: Request, res: Response) {
  const { link } = req.body
  try {
    const host = req.headers && req.headers.host
    const streamingService = detectStreamingService(link)
    if (streamingService === StreamingService.Apple) {
      const id = AppleLinkParsing.getId(link)
      const connection = getConnection()
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
      const connection = getConnection()
      const repository = connection.getRepository(SpotifyLinkCollection)
      let spotifyLinkCollection = await repository.findOne({ sourceId: id })
      if (!spotifyLinkCollection) {
        spotifyLinkCollection = new SpotifyLinkCollection(link)
        spotifyLinkCollection = await repository.save(spotifyLinkCollection)
      }
      if (!spotifyLinkCollection.appleLink) {
        // Spin off worker to fetch song from Apple
        // Careful with this: if for some reason the song can't ever be found,
        // we'll be making requests forever for nothing
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
