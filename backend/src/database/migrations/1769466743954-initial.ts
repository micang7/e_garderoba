import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1769466743954 implements MigrationInterface {
    name = 'Name1769466743954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."items_gender_enum" AS ENUM('męski', 'damski', 'uniwersalny')`);
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "size" character varying(255), "gender" "public"."items_gender_enum", "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1b0a705ce0dc5430c020a0ec31" ON "items" ("code") `);
        await queryRunner.query(`CREATE TYPE "public"."rental_details_purposetype_enum" AS ENUM('występ zespołu', 'sesja zdjęciowa zespołu', 'naprawa we własnym zakresie', 'inny')`);
        await queryRunner.query(`CREATE TABLE "rental_details" ("id" integer NOT NULL, "purposeType" "public"."rental_details_purposetype_enum", "purposeDescription" character varying(500), "plannedReturnDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_1d9288690a961dda1480ab07fcd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loss_details" ("id" integer NOT NULL, "description" character varying(500), CONSTRAINT "PK_36f41a7c47cbfb57138c0cdc1f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."return_details_status_enum" AS ENUM('bez uszkodzeń', 'uszkodzony', 'zniszczony')`);
        await queryRunner.query(`CREATE TABLE "return_details" ("id" integer NOT NULL, "status" "public"."return_details_status_enum", "description" character varying, CONSTRAINT "PK_2482b7c49d910d766a12e6519d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events_items" ("id" SERIAL NOT NULL, "eventId" integer NOT NULL, "itemId" integer NOT NULL, CONSTRAINT "PK_7e0fcefd5a797984f92810a3137" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."events_type_enum" AS ENUM('wypożyczenie', 'zagubienie', 'zwrot')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "type" "public"."events_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "userId" integer NOT NULL, "approvedBy" integer NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('tancerz', 'kierownik', 'administrator')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20), "passwordHash" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "rental_details" ADD CONSTRAINT "FK_1d9288690a961dda1480ab07fcd" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loss_details" ADD CONSTRAINT "FK_36f41a7c47cbfb57138c0cdc1f7" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "return_details" ADD CONSTRAINT "FK_2482b7c49d910d766a12e6519d5" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_items" ADD CONSTRAINT "FK_c2e7a8c00b6cb93d415812aff2d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_items" ADD CONSTRAINT "FK_15ce7e3242ef69dc00c38207bc8" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_00e17e2632c8c2f2981bcecf926" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_00e17e2632c8c2f2981bcecf926"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "events_items" DROP CONSTRAINT "FK_15ce7e3242ef69dc00c38207bc8"`);
        await queryRunner.query(`ALTER TABLE "events_items" DROP CONSTRAINT "FK_c2e7a8c00b6cb93d415812aff2d"`);
        await queryRunner.query(`ALTER TABLE "return_details" DROP CONSTRAINT "FK_2482b7c49d910d766a12e6519d5"`);
        await queryRunner.query(`ALTER TABLE "loss_details" DROP CONSTRAINT "FK_36f41a7c47cbfb57138c0cdc1f7"`);
        await queryRunner.query(`ALTER TABLE "rental_details" DROP CONSTRAINT "FK_1d9288690a961dda1480ab07fcd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_type_enum"`);
        await queryRunner.query(`DROP TABLE "events_items"`);
        await queryRunner.query(`DROP TABLE "return_details"`);
        await queryRunner.query(`DROP TYPE "public"."return_details_status_enum"`);
        await queryRunner.query(`DROP TABLE "loss_details"`);
        await queryRunner.query(`DROP TABLE "rental_details"`);
        await queryRunner.query(`DROP TYPE "public"."rental_details_purposetype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b0a705ce0dc5430c020a0ec31"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TYPE "public"."items_gender_enum"`);
    }

}
