import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CampaignsService } from 'src/services/CampaignsService';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  getAll(): string {
    return 'OK'; //FIXME
  }

  @Get('/:id')
  getOne(@Param('id') id: number): string {
    return 'OK'; //FIXME
  }

  @Get('/:id/metricas')
  getMetricsForOne(@Param('id') id: number): string {
    // TODO: Retorna as métricas consolidadas em JSON (incluindo cálculos de CTR/CPA).
    return 'OK'; //FIXME
  }

  @Post()
  create(): string {
    return 'OK'; //FIXME
  }

  @Delete('/:id')
  delete(@Param('id') id: number): string {
    return 'OK'; //FIXME
  }
}
