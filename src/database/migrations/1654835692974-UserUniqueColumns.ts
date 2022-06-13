import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserUniqueColumns1654835692974 implements MigrationInterface {
  name = 'UserUniqueColumns1654835692974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_CPF" UNIQUE ("cpf")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_CPF"`);
  }
}
