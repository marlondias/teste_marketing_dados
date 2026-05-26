import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campanha } from 'typeORM/entities/Campanha';
import { MockDataService } from './MockDataService';
import { MetricsService } from './MetricsService';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campanha)
    private readonly campanhaRepository: Repository<Campanha>,
    private readonly metricsService: MetricsService,
    private readonly mockDataService: MockDataService,
  ) {}

  async insertMocks(amount: number): Promise<number[]> {
    if (!Number.isFinite(amount) || amount < 1) {
      throw Error('Invalid amount of mocks.');
    }

    const campaigns = this.mockDataService.generateManyCampaigns(amount);
    campaigns.forEach((c) => {
      if (!Number.isFinite(c.id)) {
        delete (c as any).id;
      }
    });
    const insertedCampaigns = await this.campanhaRepository.save(campaigns);

    for (let i = 0; i < insertedCampaigns.length; i++) {
      await this.metricsService.insertMocks(insertedCampaigns[i]);
    }

    return insertedCampaigns.map((campaign) => campaign.id);
  }

  async delete(campaignId: number): Promise<void> {
    if (!Number.isFinite(campaignId) || campaignId < 1) {
      throw Error('Invalid campaign id.');
    }

    await this.campanhaRepository.delete(campaignId);
  }

  async getAll(): Promise<Campanha[]> {
    return this.campanhaRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async getOne(campaignId: number): Promise<Campanha> {
    if (!Number.isFinite(campaignId) || campaignId < 1) {
      throw Error('Invalid campaign id.');
    }

    const campaign = await this.campanhaRepository.findOne({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw Error('Campaign not found.');
    }

    return campaign;
  }
}
