import { BeforeInsert, Column, Entity } from 'typeorm'

import { getId } from '../domain/link_parsing/spotify'
import { generateSlug } from '../domain/slugs'
import BaseLinkCollection from './base_classes/BaseLinkCollection'

@Entity()
export default class SpotifyLinkCollection extends BaseLinkCollection {
  @Column({ type: 'text', nullable: true })
  appleLink: string

  @BeforeInsert()
  extractSourceId() {
    this.sourceId = getId(this.sourceLink)
  }

  @BeforeInsert()
  generateSlug() {
    this.slug = generateSlug(this.sourceLink)
  }
}
