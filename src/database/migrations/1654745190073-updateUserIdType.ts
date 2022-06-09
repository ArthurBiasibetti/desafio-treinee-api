import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserIdType1654745190073 implements MigrationInterface {
  name = 'updateUserIdType1654745190073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "permissions" TO "permission"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_permissions_enum" RENAME TO "user_permission_enum"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."user_permission_enum" RENAME TO "user_permissions_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "permission" TO "permissions"`
    );
  }
}
