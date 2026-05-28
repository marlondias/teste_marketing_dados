import { Transform, Type } from 'class-transformer';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { roundTo2Decimals } from '../valueTransformers';

@Entity({
  synchronize: false,
  name: 'campaign_stats_raw_query_result',
})
export class CampaignStats {
  @PrimaryColumn()
  campanha_id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Type(() => Number)
  @Transform(({ value }) => roundTo2Decimals(value))
  custo_total!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Type(() => Number)
  @Transform(({ value }) => roundTo2Decimals(value))
  taxa_consumo_orcamento!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Type(() => Number)
  @Transform(({ value }) => roundTo2Decimals(value))
  ctr!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Type(() => Number)
  @Transform(({ value }) => roundTo2Decimals(value))
  taxa_conversao!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Type(() => Number)
  @Transform(({ value }) => roundTo2Decimals(value))
  cpa!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Type(() => Number)
  @Transform(({ value }) => roundTo2Decimals(value))
  roas!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Type(() => Number)
  @Transform(({ value }) => roundTo2Decimals(value))
  roi!: number;

  @Column()
  is_melhor_roi!: boolean;
}
