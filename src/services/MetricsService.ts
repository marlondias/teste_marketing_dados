import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metrica } from 'typeORM/entities/Metrica';
import { MockDataService } from './MockDataService';
import { Campanha } from 'typeORM/entities/Campanha';

const MAX_AMOUNT_OF_MOCK_METRICS = 100;

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metrica)
    private readonly metricaRepository: Repository<Metrica>,
    private readonly mockDataService: MockDataService,
  ) {}

  async insertMocks(campaign: Campanha): Promise<number[]> {
    const campaignDurationInDays = this.getDifferenceInDays(
      campaign.data_inicio,
      campaign.data_fim,
    );

    const amountOfMetrics = Math.min(
      campaignDurationInDays,
      MAX_AMOUNT_OF_MOCK_METRICS,
    );

    const metrics = this.mockDataService.generateManyMetrics(
      campaign,
      amountOfMetrics,
    );

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

  private getDifferenceInDays(date1: Date, date2: Date): number {
    const dayInMs = 1000 * 60 * 60 * 24;
    const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffInMs / dayInMs);
  }
}
