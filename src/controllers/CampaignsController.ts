import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CampaignsService } from 'src/services/CampaignsService';
import {
  CreateCampaignMocksRequestDTO,
  CreateCampaignMocksResponseDTO,
  GetAllCampaignsResponseDTO,
  getCampaignDtoFromEntity,
  GetCampaignResponseDTO,
} from './DTOs/CampaignDTOs';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { MetricsService } from 'src/services/MetricsService';
import { getMetricDtoFromEntity } from './DTOs/MetricsDTOs';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly metricsService: MetricsService,
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
  @ApiQuery({
    name: 'type',
    description: 'Formato do arquivo de resposta (JSON ou CSV)',
    enum: ['json', 'csv'],
    required: true,
    example: 'json',
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas consolidadas da campanha em arquivo JSON ou CSV.',
  })
  getMetricsForOne(
    @Param('id') id: number,
    @Query('type') type: 'json' | 'csv',
  ): string {
    // TODO: Retorna as métricas consolidadas em JSON ou CSV (incluindo cálculos de CTR/CPA).
    return 'OK'; //FIXME
  }
}
