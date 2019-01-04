import { Column, Entity } from 'typeorm'

import BaseModel from './base_classes/BaseModel'

@Entity()
export default class TestModel extends BaseModel {
  @Column({ nullable: true })
  haha: number
}
