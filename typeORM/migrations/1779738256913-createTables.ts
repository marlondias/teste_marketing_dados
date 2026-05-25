import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1779738256913 implements MigrationInterface {
  name = 'CreateTables1779738256913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "campanhas" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "data_inicio" date NOT NULL, "data_fim" date NOT NULL, "orcamento" numeric(10,2) NOT NULL, CONSTRAINT "PK_555b1dc3b81cb8ef0d3887e22b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "metricas" ("id" SERIAL NOT NULL, "data_metrica" date NOT NULL, "impressoes" integer NOT NULL, "cliques" integer NOT NULL, "conversoes" integer NOT NULL, "custo_por_clique" numeric(10,2) NOT NULL, "campanha_id" integer NOT NULL, CONSTRAINT "PK_ea1f023b1bc70fead55b2c7da13" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "metricas" ADD CONSTRAINT "FK_191730524feff67018799f4f491" FOREIGN KEY ("campanha_id") REFERENCES "campanhas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metricas" DROP CONSTRAINT "FK_191730524feff67018799f4f491"`,
    );
    await queryRunner.query(`DROP TABLE "metricas"`);
    await queryRunner.query(`DROP TABLE "campanhas"`);
  }
}
