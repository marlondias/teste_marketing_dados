import { Controller, Post } from '@nestjs/common';
import { CampaignsService } from 'src/services/CampaignsService';
import { MetricsService } from 'src/services/MetricsService';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly metricsService: MetricsService,
  ) {}

  @Post()
  processExternalData(): string {
    return 'OK'; //FIXME
  }
}
