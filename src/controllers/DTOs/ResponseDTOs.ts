import { CampaignDTO, DetailedCampaignDTO, MetricDTO } from './EntityDTOs';

export class CampanhaCreateMocksResponse {
  ids!: number[];
}

export class CampanhaGetOneResponse {
  campanha!: DetailedCampaignDTO;
  metricas!: MetricDTO[];
}

export class CampanhaGetAllResponse {
  campanhas!: CampaignDTO[];
}
