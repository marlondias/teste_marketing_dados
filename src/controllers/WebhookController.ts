import { Body, Controller, Post } from '@nestjs/common';
import { CampaignsService } from 'src/services/CampaignsService';
import { MetricsService } from 'src/services/MetricsService';
import { WebhookAddExternalMetricRequest } from './DTOs/RequestDTOs';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly metricsService: MetricsService,
  ) {}

  @Post()
  async addExternalMetric(
    @Body() body: WebhookAddExternalMetricRequest,
  ): Promise<string> {
    return 'OK'; //FIXME
  }
}
