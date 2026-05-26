import { ApiProperty } from '@nestjs/swagger';
import { Metrica } from 'typeORM/entities/Metrica';

export class MetricsDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  campaignId: number;

  @ApiProperty()
  dateOfMeasurement: Date;

  @ApiProperty()
  impressions: number;

  @ApiProperty()
  clicks: number;

  @ApiProperty()
  conversions: number;

  @ApiProperty()
  costPerClick: number;
}

export function getMetricDtoFromEntity(entity: Metrica): MetricsDTO {
  return {
    id: entity.id,
    campaignId: entity.campanha_id,
    impressions: entity.impressoes,
    clicks: entity.cliques,
    conversions: entity.conversoes,
    costPerClick: entity.custo_por_clique,
    dateOfMeasurement: entity.data_metrica,
  };
}
