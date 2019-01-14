import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class InitialMigration1546846023748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'spotify_link_collection',
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
            name: 'appleLink',
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

    await queryRunner.createTable(
      new Table({
        name: 'test_model',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'haha',
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
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('spotify_link_collection')
    await queryRunner.dropTable('test_model')
  }
}
