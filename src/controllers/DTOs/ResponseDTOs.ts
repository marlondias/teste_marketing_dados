import { ApiProperty } from '@nestjs/swagger';
import { CampaignDTO, DetailedCampaignDTO, MetricDTO } from './EntityDTOs';

export class CreatedIdResponse {
  @ApiProperty({ type: 'integer', description: 'ID da entidade recém criada.' })
  id!: number;
}

export class CreatedIdsArrayResponse {
  @ApiProperty({
    type: 'array',
    items: { type: 'integer' },
    description: 'Array com IDs das entidades recém criadas.',
  })
  ids!: number[];
}

export class AppWelcomeResponse {
  @ApiProperty()
  message!: string;
}

export class CampanhaGetOneResponse {
  @ApiProperty()
  campanha!: DetailedCampaignDTO;

  @ApiProperty({ type: [MetricDTO] })
  metricas!: MetricDTO[];
}

export class CampanhaGetAllResponse {
  @ApiProperty({ type: [CampaignDTO] })
  campanhas!: CampaignDTO[];
}
