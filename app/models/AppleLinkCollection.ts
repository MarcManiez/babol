import { BeforeInsert, Column, Entity } from 'typeorm'

import { getId } from '../domain/link_parsing/apple'
import { generateSlug } from '../domain/slugs'
import BaseLinkCollection from './base_classes/BaseLinkCollection'

@Entity()
export default class AppleLinkCollection extends BaseLinkCollection {
  @Column({ type: 'text', nullable: true })
  spotifyLink: string

  @BeforeInsert()
  extractSourceId() {
    this.sourceId = getId(this.sourceLink)
  }

  @BeforeInsert()
  generateSlug() {
    this.slug = generateSlug(this.sourceLink)
  }
}
