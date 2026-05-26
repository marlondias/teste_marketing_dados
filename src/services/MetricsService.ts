import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metrica } from 'typeORM/entities/Metrica';
import { MockDataService } from './MockDataService';
import { Campanha } from 'typeORM/entities/Campanha';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metrica)
    private readonly metricaRepository: Repository<Metrica>,
    private readonly mockDataService: MockDataService,
  ) {}

  async insertMocks(campaign: Campanha): Promise<number[]> {
    const metrics = this.mockDataService.generateManyMetrics(campaign);

    metrics.forEach((m) => {
      if (!Number.isFinite(m.id)) {
        delete (m as any).id;
      }
    });

    const insertedMetrics = await this.metricaRepository.save(metrics);

    return insertedMetrics.map((metric) => metric.id);
  }

  async getAllByCampaign(campaignId: number): Promise<Metrica[]> {
    return this.metricaRepository.find({
      where: { campanha_id: campaignId },
      order: { data_metrica: 'ASC' },
    });
  }
}
