import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  synchronize: false,
  name: 'campaign_stats_raw_query_result',
})
export class CampaignStats {
  @PrimaryColumn()
  campanha_id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  custo_total!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  taxa_consumo_orcamento!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ctr!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  taxa_conversao!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cpa!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  roas!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  roi!: number;

  @Column()
  is_melhor_roi!: boolean;
}
