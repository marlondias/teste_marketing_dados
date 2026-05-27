import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Campanha } from './Campanha';
import { decimalTransformer } from 'typeORM/valueTransformers';

@Entity('metricas')
export class Metrica {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'integer' })
  @Index()
  campanha_id!: number;

  @Column({ type: 'date' })
  @Index()
  data_metrica!: Date;

  @Column({ type: 'integer' })
  impressoes!: number;

  @Column({ type: 'integer' })
  cliques!: number;

  @Column({ type: 'integer' })
  conversoes!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  custo_por_clique!: number;

  @ManyToOne(() => Campanha, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campanha_id' })
  campanha!: Campanha;
}
