import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  StreamableFile,
} from '@nestjs/common';
import { CampaignsService } from 'src/services/CampaignsService';
import { ApiResponse } from '@nestjs/swagger';
import { MetricsService } from 'src/services/MetricsService';
import { CampaignStatsService } from 'src/services/CampaignStatsService';
import { ReportGeneratorService } from 'src/services/ReportGeneratorService';
import { CampanhaCreateMocksRequest } from './DTOs/RequestDTOs';
import {
  CampanhaCreateMocksResponse,
  CampanhaGetAllResponse,
  CampanhaGetOneResponse,
} from './DTOs/ResponseDTOs';
import {
  getCampaignDtoFromEntity,
  getDetailedCampaignDtoFromEntity,
  getMetricDtoFromEntity,
} from './DTOs/EntityDTOs';

@Controller('campanhas')
export class CampanhasController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly metricsService: MetricsService,
    private readonly campaignStatsService: CampaignStatsService,
    private readonly reportGeneratorService: ReportGeneratorService,
  ) {}

  @Post('/mocks')
  async createMocks(
    @Body() body: CampanhaCreateMocksRequest,
  ): Promise<CampanhaCreateMocksResponse> {
    const ids = await this.campaignsService.insertMocks(body.amount);
    return { ids };
  }

  @Delete('/:id')
  @ApiResponse({ status: 204 })
  async delete(@Param('id') id: number): Promise<void> {
    await this.campaignsService.delete(id);
  }

  @Get()
  async getAll(): Promise<CampanhaGetAllResponse> {
    const campaigns = await this.campaignsService.getAll();
    return {
      campanhas: campaigns.map(getCampaignDtoFromEntity),
    };
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<CampanhaGetOneResponse> {
    const campaign = await this.campaignsService.getOne(id);
    const stats = await this.campaignStatsService.getSingleCampaignStats(id);
    const metrics = await this.metricsService.getAllByCampaign(id);

    return {
      campanha: getDetailedCampaignDtoFromEntity(campaign, stats),
      metricas: metrics.map(getMetricDtoFromEntity),
    };
  }

  @Get('/:id/metricas')
  @ApiResponse({
    status: 200,
    type: 'application/json',
    description: 'Arquivo JSON contendo métricas e cálculos sobre a campanha.',
  })
  async getMetricsForOne(@Param('id') id: number): Promise<StreamableFile> {
    const campaign = await this.campaignsService.getOne(id);
    const stats = await this.campaignStatsService.getSingleCampaignStats(id);
    const metrics = await this.metricsService.getAllByCampaign(id);

    const dataStream = this.reportGeneratorService.generateCampaignReportAsJson(
      campaign,
      stats,
      metrics,
    );

    return new StreamableFile(dataStream, {
      type: 'application/json',
      disposition: `attachment; filename="campanha_${id}.json"`,
    });
  }
}
