import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1654733326197 implements MigrationInterface {
  name = 'CreateUser1654733326197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_permissions_enum" AS ENUM('ADMIN', 'COLAB')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(120) NOT NULL, "birthday" date NOT NULL DEFAULT now(), "cpf" character varying NOT NULL, "comments" character varying(500) NOT NULL, "password" character varying(100) NOT NULL, "permissions" "public"."user_permissions_enum" NOT NULL DEFAULT 'COLAB', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_permissions_enum"`);
  }
}
