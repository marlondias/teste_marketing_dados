import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Metrica } from './Metrica';
import { decimalTransformer } from '../valueTransformers';

@Entity('campanhas')
export class Campanha {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ type: 'date' })
  data_inicio!: Date;

  @Column({ type: 'date' })
  data_fim!: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  orcamento!: number;

  @OneToMany(() => Metrica, (metrica) => metrica.campanha)
  metricas!: Metrica[];
}
