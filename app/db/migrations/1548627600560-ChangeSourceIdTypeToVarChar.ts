import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeSourceIdTypeToVarChar1548627600560
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE apple_link_collection
      ALTER COLUMN "sourceId" TYPE varchar;
      ALTER TABLE spotify_link_collection
      ALTER COLUMN "sourceId" TYPE varchar;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE apple_link_collection
      ALTER COLUMN "sourceId" TYPE int USING ("sourceId"::integer);
      ALTER TABLE spotify_link_collection
      ALTER COLUMN "sourceId" TYPE int USING ("sourceId"::integer);
    `)
  }
}
