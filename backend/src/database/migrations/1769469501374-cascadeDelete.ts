import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1769469501374 implements MigrationInterface {
    name = 'Name1769469501374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rental_details" DROP CONSTRAINT "FK_1d9288690a961dda1480ab07fcd"`);
        await queryRunner.query(`ALTER TABLE "loss_details" DROP CONSTRAINT "FK_36f41a7c47cbfb57138c0cdc1f7"`);
        await queryRunner.query(`ALTER TABLE "return_details" DROP CONSTRAINT "FK_2482b7c49d910d766a12e6519d5"`);
        await queryRunner.query(`ALTER TABLE "events_items" DROP CONSTRAINT "FK_15ce7e3242ef69dc00c38207bc8"`);
        await queryRunner.query(`ALTER TABLE "events_items" DROP CONSTRAINT "FK_c2e7a8c00b6cb93d415812aff2d"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_00e17e2632c8c2f2981bcecf926"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "rental_details" ADD CONSTRAINT "FK_1d9288690a961dda1480ab07fcd" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loss_details" ADD CONSTRAINT "FK_36f41a7c47cbfb57138c0cdc1f7" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "return_details" ADD CONSTRAINT "FK_2482b7c49d910d766a12e6519d5" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_items" ADD CONSTRAINT "FK_c2e7a8c00b6cb93d415812aff2d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_items" ADD CONSTRAINT "FK_15ce7e3242ef69dc00c38207bc8" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_00e17e2632c8c2f2981bcecf926" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_00e17e2632c8c2f2981bcecf926"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "events_items" DROP CONSTRAINT "FK_15ce7e3242ef69dc00c38207bc8"`);
        await queryRunner.query(`ALTER TABLE "events_items" DROP CONSTRAINT "FK_c2e7a8c00b6cb93d415812aff2d"`);
        await queryRunner.query(`ALTER TABLE "return_details" DROP CONSTRAINT "FK_2482b7c49d910d766a12e6519d5"`);
        await queryRunner.query(`ALTER TABLE "loss_details" DROP CONSTRAINT "FK_36f41a7c47cbfb57138c0cdc1f7"`);
        await queryRunner.query(`ALTER TABLE "rental_details" DROP CONSTRAINT "FK_1d9288690a961dda1480ab07fcd"`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_00e17e2632c8c2f2981bcecf926" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_items" ADD CONSTRAINT "FK_c2e7a8c00b6cb93d415812aff2d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_items" ADD CONSTRAINT "FK_15ce7e3242ef69dc00c38207bc8" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "return_details" ADD CONSTRAINT "FK_2482b7c49d910d766a12e6519d5" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loss_details" ADD CONSTRAINT "FK_36f41a7c47cbfb57138c0cdc1f7" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rental_details" ADD CONSTRAINT "FK_1d9288690a961dda1480ab07fcd" FOREIGN KEY ("id") REFERENCES "events_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
