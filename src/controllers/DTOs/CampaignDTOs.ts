import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Campanha } from 'typeORM/entities/Campanha';
import { MetricsDTO } from './MetricsDTOs';

export class CampaignDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  budget: number;
}

export function getCampaignDtoFromEntity(entity: Campanha): CampaignDTO {
  return {
    id: entity.id,
    name: entity.nome,
    startDate: entity.data_inicio,
    endDate: entity.data_fim,
    budget: entity.orcamento,
  };
}

export class CreateCampaignMocksRequestDTO {
  @ApiProperty({
    example: 5,
    description: 'Quantidade de registros ficticios a criar.',
  })
  @IsNotEmpty()
  @IsInt()
  amount: number;
}

export class CreateCampaignMocksResponseDTO {
  @ApiProperty({ description: 'Array de IDs das campanhas recém criadas.' })
  newCampaignIds: number[];
}

export class GetCampaignResponseDTO {
  @ApiProperty()
  campaign: CampaignDTO;

  @ApiProperty()
  metrics: MetricsDTO[];
}

export class GetAllCampaignsResponseDTO {
  @ApiProperty()
  campaigns: CampaignDTO[];
}
