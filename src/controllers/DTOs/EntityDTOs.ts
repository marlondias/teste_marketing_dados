import { ApiProperty } from '@nestjs/swagger';
import { getDateAsYMD } from 'src/utils/DateUtils';
import { CampaignStats } from 'src/typeORM/entities/CampaignStats';
import { Campanha } from 'src/typeORM/entities/Campanha';
import { Metrica } from 'src/typeORM/entities/Metrica';

export class CampaignDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nome!: string;

  @ApiProperty({ format: 'date' })
  data_inicio!: string;

  @ApiProperty({ format: 'date' })
  data_fim!: string;

  @ApiProperty()
  orcamento!: number;

  @ApiProperty()
  is_melhor_roi!: boolean;
}

export class DetailedCampaignDTO extends CampaignDTO {
  @ApiProperty()
  custo_total!: number;

  @ApiProperty()
  taxa_consumo_orcamento!: number;

  @ApiProperty()
  ctr!: number;

  @ApiProperty()
  taxa_conversao!: number;

  @ApiProperty()
  cpa!: number;

  @ApiProperty()
  roas!: number;

  @ApiProperty()
  roi!: number;
}

export class MetricDTO {
  @ApiProperty({ type: 'integer' })
  id!: number;

  @ApiProperty({ type: 'integer' })
  campanha_id!: number;

  @ApiProperty({ format: 'date' })
  data_metrica!: string;

  @ApiProperty({ type: 'integer' })
  impressoes!: number;

  @ApiProperty({ type: 'integer' })
  cliques!: number;

  @ApiProperty({ type: 'integer' })
  conversoes!: number;

  @ApiProperty()
  custo_por_clique!: number;
}

export function getCampaignDtoFromEntity(
  campaign: Campanha,
  stats: CampaignStats,
): CampaignDTO {
  const { nome, orcamento } = campaign;
  const { is_melhor_roi } = stats;
  return {
    id: campaign.id ?? Number.NaN,
    data_inicio: getDateAsYMD(campaign.data_inicio),
    data_fim: getDateAsYMD(campaign.data_fim),
    nome,
    orcamento,
    is_melhor_roi,
  };
}

export function getDetailedCampaignDtoFromEntity(
  campaign: Campanha,
  stats: CampaignStats,
): DetailedCampaignDTO {
  const { campanha_id, ...statsProps } = stats;

  return {
    ...getCampaignDtoFromEntity(campaign, stats),
    ...statsProps,
  };
}

export function getMetricDtoFromEntity(metric: Metrica): MetricDTO {
  const { id, campanha, data_metrica, ...props } = metric;
  return {
    id: id ?? Number.NaN,
    data_metrica: getDateAsYMD(data_metrica),
    ...props,
  };
}
