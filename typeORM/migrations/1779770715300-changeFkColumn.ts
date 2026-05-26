import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFkColumn1779770715300 implements MigrationInterface {
  name = 'ChangeFkColumn1779770715300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metricas" DROP CONSTRAINT "FK_191730524feff67018799f4f491"`,
    );
    await queryRunner.query(
      `ALTER TABLE "metricas" ADD CONSTRAINT "FK_191730524feff67018799f4f491" FOREIGN KEY ("campanha_id") REFERENCES "campanhas"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metricas" DROP CONSTRAINT "FK_191730524feff67018799f4f491"`,
    );
    await queryRunner.query(
      `ALTER TABLE "metricas" ADD CONSTRAINT "FK_191730524feff67018799f4f491" FOREIGN KEY ("campanha_id") REFERENCES "campanhas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
