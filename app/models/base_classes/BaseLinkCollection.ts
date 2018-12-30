import { Column, Index } from 'typeorm'

import BaseModel from './BaseModel'

export default class BaseLinkCollection extends BaseModel {
  @Index()
  @Column({ type: 'text', unique: true })
  sourceLink: string

  @Column({ nullable: true })
  artist: string

  @Column({ nullable: true })
  album: string

  @Column({ nullable: true })
  track: string

  @Index()
  @Column({ unique: true })
  slug: string
}
