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
import {
  CreateCampaignMocksRequestDTO,
  CreateCampaignMocksResponseDTO,
  GetAllCampaignsResponseDTO,
  getCampaignDtoFromEntity,
  GetCampaignResponseDTO,
} from './DTOs/CampaignDTOs';
import { ApiBody, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { MetricsService } from 'src/services/MetricsService';
import { getMetricDtoFromEntity } from './DTOs/MetricsDTOs';
import { CampaignStatsService } from 'src/services/CampaignStatsService';
import { ReportGeneratorService } from 'src/services/ReportGeneratorService';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly metricsService: MetricsService,
    private readonly campaignStatsService: CampaignStatsService,
    private readonly reportGeneratorService: ReportGeneratorService,
  ) {}

  @Post('/mocks')
  @ApiBody({ type: CreateCampaignMocksRequestDTO })
  @ApiResponse({ status: 200, type: CreateCampaignMocksResponseDTO })
  async createMocks(
    @Body() body: CreateCampaignMocksRequestDTO,
  ): Promise<CreateCampaignMocksResponseDTO> {
    if (!Number.isFinite(body.amount) || body.amount < 1) {
      throw Error('Invalid amount of mocks to create.');
    }

    const ids = await this.campaignsService.insertMocks(body.amount);
    return { newCampaignIds: ids };
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'ID da campanha', type: Number })
  @ApiResponse({ status: 204 })
  async delete(@Param('id') id: number): Promise<void> {
    await this.campaignsService.delete(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: GetAllCampaignsResponseDTO })
  async getAll(): Promise<GetAllCampaignsResponseDTO> {
    const campaigns = await this.campaignsService.getAll();
    return {
      campaigns: campaigns.map(getCampaignDtoFromEntity),
    };
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'ID da campanha', type: Number })
  @ApiResponse({ status: 200, type: GetCampaignResponseDTO })
  async getOne(@Param('id') id: number): Promise<GetCampaignResponseDTO> {
    const campaign = await this.campaignsService.getOne(id);
    const metrics = await this.metricsService.getAllByCampaign(campaign.id);
    return {
      campaign: getCampaignDtoFromEntity(campaign),
      metrics: metrics.map(getMetricDtoFromEntity),
    };
  }

  @Get('/:id/metricas')
  @ApiParam({ name: 'id', description: 'ID da campanha', type: Number })
  @ApiResponse({
    status: 200,
    type: 'application/json',
    description: 'Métricas consolidadas da campanha em arquivo JSON.',
  })
  async getMetricsForOne(@Param('id') id: number): Promise<StreamableFile> {
    const campaign = await this.campaignsService.getOne(id);
    const campaignStats =
      await this.campaignStatsService.getSingleCampaignStats(id);
    const metrics = await this.metricsService.getAllByCampaign(campaign.id);

    const dataStream = this.reportGeneratorService.generateCampaignReportAsJson(
      campaign,
      campaignStats,
      metrics,
    );

    return new StreamableFile(dataStream, {
      type: 'application/json',
      disposition: `attachment; filename="campanha_${id}.json"`,
    });
  }
}
