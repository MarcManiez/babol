import { Column, Entity } from 'typeorm'

import BaseLinkCollection from './base_classes/BaseLinkCollection'

@Entity()
export default class SpotifyLinkCollection extends BaseLinkCollection {
  @Column({ type: 'text', nullable: true })
  appleLink: string
}
