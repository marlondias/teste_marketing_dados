import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  StreamableFile,
} from '@nestjs/common';
import { CampaignsService } from 'src/services/CampaignsService';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MetricsService } from 'src/services/MetricsService';
import { CampaignStatsService } from 'src/services/CampaignStatsService';
import { ReportGeneratorService } from 'src/services/ReportGeneratorService';
import {
  CampanhaCreateMocksRequest,
  CampanhaCreateRequest,
} from './DTOs/RequestDTOs';
import {
  CreatedIdsArrayResponse,
  CampanhaGetAllResponse,
  CampanhaGetOneResponse,
  CreatedIdResponse,
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
  @ApiOperation({
    summary: 'Gerar campanhas fictícias',
    description:
      'Cria a quantidade desejada de campanhas fictícias. Cada campanha terá dados aleatórios (porém coerentes) e métricas diárias para todo seu período de duração.',
  })
  async createMocks(
    @Body() body: CampanhaCreateMocksRequest,
  ): Promise<CreatedIdsArrayResponse> {
    const ids = await this.campaignsService.insertMocks(body.amount);
    return { ids };
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma campanha com dados específicos.' })
  async create(
    @Body() body: CampanhaCreateRequest,
  ): Promise<CreatedIdResponse> {
    const { nome, orcamento } = body;
    const data_inicio = new Date(body.data_inicio);
    const data_fim = new Date(body.data_fim);

    const id = await this.campaignsService.insert({
      nome,
      orcamento,
      data_inicio,
      data_fim,
    });

    return { id };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir uma campanha.' })
  async delete(@Param('id') id: number): Promise<void> {
    await this.campaignsService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Ver dados gerais sobre todas as campanhas.' })
  async getAll(): Promise<CampanhaGetAllResponse> {
    const campaigns = await this.campaignsService.getAll();
    const statsByCampaigns =
      await this.campaignStatsService.getManyCampaignStats();

    return {
      campanhas: campaigns.map((campaign) => {
        const campaignStats = statsByCampaigns.filter(
          (s) => s.campanha_id === campaign.id,
        )[0];
        return getCampaignDtoFromEntity(campaign, campaignStats);
      }),
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Ver dados específicos sobre uma campanha.' })
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
  @ApiOperation({ summary: 'Baixar relatório consolidado sobre uma campanha.' })
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
