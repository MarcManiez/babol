import { Column, Index } from 'typeorm'

import { CoreLinkProperties } from '../../domain/linkMatching'
import { links } from '../../routeHelpers'
import BaseModel from './BaseModel'

export default class BaseLinkCollection extends BaseModel {
  @Index()
  @Column({ type: 'text', unique: true })
  sourceLink: string

  @Index()
  @Column({ type: 'int', unique: true })
  sourceId: string

  @Column({ nullable: true })
  artist: string

  @Column({ nullable: true })
  album: string

  @Column({ nullable: true })
  track: string

  @Index()
  @Column({ unique: true })
  slug: string

  constructor(sourceLink: string) {
    super()
    this.sourceLink = sourceLink
  }

  babolLinkPath() {
    return links + '/' + this.slug
  }

  applyCoreLinkProperties(coreLinkProperties: CoreLinkProperties) {
    this.artist = coreLinkProperties.artist
    if (coreLinkProperties.album) {
      this.album = coreLinkProperties.album
    }
    if (coreLinkProperties.artist) {
      this.artist = coreLinkProperties.artist
    }
    if (coreLinkProperties.track) {
      this.track = coreLinkProperties.track
    }
  }
}
