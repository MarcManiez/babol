import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddTrackToLinkCollections1548624060394
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'apple_link_collection',
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isUnique: true,
      }),
    )

    await queryRunner.addColumn(
      'spotify_link_collection',
      new TableColumn({
        name: 'track',
        type: 'varchar',
        isUnique: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('apple_link_collection', 'sourceId')
    await queryRunner.dropColumn('spotify_link_collection', 'sourceId')
  }
}
