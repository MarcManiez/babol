import { Column, Entity } from 'typeorm'

import BaseLinkCollection from './base_classes/BaseLinkCollection'

@Entity()
export default class AppleLinkCollection extends BaseLinkCollection {
  @Column({ type: 'text', nullable: true })
  spotifyLink: string
}
