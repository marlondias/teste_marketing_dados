import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Campanha } from './Campanha';

@Entity('metricas')
export class Metrica {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((metrica: Metrica) => metrica.campanha)
  campanha_id: number;

  @Column({ type: 'date' })
  data_metrica: Date;

  @Column({ type: 'integer' })
  impressoes: number;

  @Column({ type: 'integer' })
  cliques: number;

  @Column({ type: 'integer' })
  conversoes: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  custo_por_clique: number;

  @ManyToOne(() => Campanha, { nullable: false })
  @JoinColumn({ name: 'campanha_id' })
  campanha: Campanha;
}
