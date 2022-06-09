import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserCommentColumn1654733657048
  implements MigrationInterface
{
  name = 'UpdateUserCommentColumn1654733657048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "comments" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "comments" SET NOT NULL`
    );
  }
}
