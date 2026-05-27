import { CampaignStats } from 'src/services/CampaignStatsService';
import { Campanha } from 'typeORM/entities/Campanha';
import { Metrica } from 'typeORM/entities/Metrica';

export class CampaignDTO {
  id!: number;
  nome!: string;
  data_inicio!: Date;
  data_fim!: Date;
  orcamento!: number;
}

export class DetailedCampaignDTO extends CampaignDTO {
  custo_total!: number;
  taxa_consumo_orcamento!: number;
  ctr!: number;
  taxa_conversao!: number;
  cpa!: number;
  roas!: number;
  roi!: number;
}

export class MetricDTO {
  id!: number;
  campanha_id!: number;
  data_metrica!: Date;
  impressoes!: number;
  cliques!: number;
  conversoes!: number;
  custo_por_clique!: number;
}

export function getCampaignDtoFromEntity(campaign: Campanha): CampaignDTO {
  const { id, ...props } = campaign;
  return { id: id ?? Number.NaN, ...props };
}

export function getDetailedCampaignDtoFromEntity(
  campaign: Campanha,
  stats: CampaignStats,
): DetailedCampaignDTO {
  const { campanha_id, orcamento, is_melhor_roi, ...statsProps } = stats;

  return {
    ...getCampaignDtoFromEntity(campaign),
    ...statsProps,
  };
}

export function getMetricDtoFromEntity(metric: Metrica): MetricDTO {
  const { id, ...props } = metric;
  return { id: id ?? Number.NaN, ...props };
}
