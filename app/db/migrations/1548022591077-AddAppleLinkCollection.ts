import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class AddAppleLinkCollection1548022591077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'apple_link_collection',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'sourceLink',
            type: 'text',
            isUnique: true,
          },
          {
            name: 'artist',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'album',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'spotifyLink',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdDate',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updatedDate',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        indices: [{ columnNames: ['sourceLink'] }, { columnNames: ['slug'] }],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('apple_link_collection')
  }
}
