import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campanha } from 'src/typeORM/entities/Campanha';
import { MockDataService } from './MockDataService';
import { MetricsService } from './MetricsService';

type CampaignToInsert = Omit<Campanha, 'id' | 'metricas'>;

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
    const insertedCampaigns = await this.campanhaRepository.save(campaigns);

    for (let i = 0; i < insertedCampaigns.length; i++) {
      await this.metricsService.insertMocks(insertedCampaigns[i]);
    }

    return insertedCampaigns.map((campaign) => campaign.id ?? Number.NaN);
  }

  async insert(newCampaign: CampaignToInsert): Promise<number> {
    if (newCampaign.nome.trim() !== newCampaign.nome) {
      throw new Error('Campaign name cannot begin or end with spaces.');
    }
    if (newCampaign.data_inicio > newCampaign.data_fim) {
      throw new Error('Campaign starting date cannot be after the end date.');
    }
    const insertedCampaign = await this.campanhaRepository.save(newCampaign);

    return insertedCampaign.id ?? Number.NaN;
  }

  async delete(campaignId: number): Promise<void> {
    if (!Number.isFinite(campaignId) || campaignId < 1) {
      throw Error('Invalid campaign id.');
    }

    await this.campanhaRepository.delete(campaignId);
  }

  async getAll(): Promise<Campanha[]> {
    return this.campanhaRepository.find({
      order: { id: 'ASC' },
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
