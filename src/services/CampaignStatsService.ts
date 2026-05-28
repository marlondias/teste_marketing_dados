import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CampaignStats } from 'src/typeORM/entities/CampaignStats';
import { getQueryContents } from 'src/typeORM/queryLoader';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CampaignStatsService {
  private readonly productSellCost: number;

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    configService: ConfigService,
  ) {
    this.productSellCost = Number(
      configService.get('CAMPAIGN_PRODUCT_SELL_COST'),
    );

    if (!Number.isFinite(this.productSellCost) || this.productSellCost <= 0) {
      throw new InternalServerErrorException(
        'Invalid value for product sell cost. Check app settings.',
      );
    }
  }

  async getSingleCampaignStats(campaignId: number): Promise<CampaignStats> {
    const items = await this.fetchCampaignStats();
    return items.filter((r) => Number(r.campanha_id) === campaignId)[0];
  }

  async getManyCampaignStats(): Promise<CampaignStats[]> {
    return await this.fetchCampaignStats();
  }

  private async fetchCampaignStats(): Promise<CampaignStats[]> {
    const query = await getQueryContents('getCampaignsStats');
    const rawRows = await this.dataSource.query<Record<string, any>[]>(query, [
      this.productSellCost,
    ]);

    return plainToInstance(CampaignStats, rawRows);
  }
}
