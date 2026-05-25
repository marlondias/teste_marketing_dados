import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('campanhas')
export class Campanha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'date' })
  data_inicio: Date;

  @Column({ type: 'date' })
  data_fim: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  orcamento: number;
}
