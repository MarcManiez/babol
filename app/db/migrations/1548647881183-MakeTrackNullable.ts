import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class MakeTrackNullable1548647881183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'apple_link_collection',
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isUnique: true,
      }),
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isNullable: true,
        isUnique: false,
      }),
    )

    await queryRunner.changeColumn(
      'spotify_link_collection',
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isUnique: true,
      }),
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isNullable: true,
        isUnique: false,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'apple_link_collection',
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isNullable: true,
        isUnique: false,
      }),
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isUnique: true,
      }),
    )

    await queryRunner.changeColumn(
      'spotify_link_collection',
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isNullable: true,
        isUnique: false,
      }),
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isUnique: true,
      }),
    )
  }
}
