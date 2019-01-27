import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableIndex,
} from 'typeorm'

export class AddSourceIdToLinkTables1548618833215
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'apple_link_collection',
      new TableColumn({
        name: 'sourceId',
        type: 'int',
        isUnique: true,
      }),
    )

    await queryRunner.createIndex(
      'apple_link_collection',
      new TableIndex({
        name: 'IDX_APPLE_SOURCE_ID',
        columnNames: ['sourceId'],
      }),
    )

    await queryRunner.addColumn(
      'spotify_link_collection',
      new TableColumn({
        name: 'sourceId',
        type: 'int',
        isUnique: true,
      }),
    )

    await queryRunner.createIndex(
      'spotify_link_collection',
      new TableIndex({
        name: 'IDX_SPOTIFY_SOURCE_ID',
        columnNames: ['sourceId'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex('apple_link_collection', 'IDX_APPLE_SOURCE_ID')
    await queryRunner.dropColumn('apple_link_collection', 'sourceId')
    await queryRunner.dropIndex(
      'spotify_link_collection',
      'IDX_SPOTIFY_SOURCE_ID',
    )
    await queryRunner.dropColumn('spotify_link_collection', 'sourceId')
  }
}
