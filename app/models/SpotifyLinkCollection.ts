import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export default class SpotifyLinkCollection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ type: 'text', unique: true })
  sourceLink: string

  @Column({ type: 'text', nullable: true })
  appleLink: string

  @Column({ nullable: true })
  artist: string

  @Column({ nullable: true })
  album: string

  @Column({ nullable: true })
  track: string

  @Index()
  @Column({ unique: true })
  slug: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
