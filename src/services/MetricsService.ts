import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metrica } from 'typeORM/entities/Metrica';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metrica)
    private readonly metricaRepository: Repository<Metrica>,
  ) {}

  async getAllByCampaign(campaignId: number): Promise<Metrica[]> {
    return this.metricaRepository.find({
      where: { campanha_id: campaignId },
      order: { data_metrica: 'ASC' },
    });
  }
}
