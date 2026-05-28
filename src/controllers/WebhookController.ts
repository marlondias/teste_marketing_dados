import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CampaignsService } from 'src/services/CampaignsService';
import { MetricsService } from 'src/services/MetricsService';
import { WebhookAddExternalMetricRequest } from './DTOs/RequestDTOs';
import { CreatedIdResponse } from './DTOs/ResponseDTOs';
import { ApiOperation } from '@nestjs/swagger';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly metricsService: MetricsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Incluir métrica a uma campanha',
    description:
      'Pode ser usado por ferramentas externas para incluir dados de métrica a uma campanha, identificada pelo "campanha_id".',
  })
  async addExternalMetric(
    @Body() body: WebhookAddExternalMetricRequest,
  ): Promise<CreatedIdResponse> {
    const campaign = await this.campaignsService.getOne(body.campanha_id);
    if (!campaign.id) {
      throw new BadRequestException(
        'Invalid campaign ID to associate new metric.',
      );
    }

    const { data_metrica, impressoes, cliques, conversoes, custo_por_clique } =
      body;

    const id = await this.metricsService.insert({
      campanha_id: campaign.id,
      data_metrica: new Date(data_metrica),
      impressoes,
      cliques,
      conversoes,
      custo_por_clique,
    });

    return { id };
  }
}
