import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getQueryContents } from 'typeORM/queryLoader';

export type CampaignStats = {
  campanha_id: number;
  orcamento: number;
  custo_total: number;
  taxa_consumo_orcamento: number;
  ctr: number;
  taxa_conversao: number;
  cpa: number;
  roas: number;
  roi: number;
  is_melhor_roi: boolean;
};

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
    const query = await getQueryContents('getCampaignsStats');
    const rows = await this.dataSource.query<Record<string, any>[]>(query, [
      this.productSellCost,
      campaignId,
    ]);

    return rows.map((r) => this.mapRowToCampaignStats(r))[0];
  }

  async getManyCampaignStats(): Promise<CampaignStats[]> {
    const query = await getQueryContents('getCampaignsStats');
    const rows = await this.dataSource.query<Record<string, any>[]>(query, [
      this.productSellCost,
      null,
    ]);

    return rows.map((r) => this.mapRowToCampaignStats(r));
  }

  private mapRowToCampaignStats(row: Record<string, any>): CampaignStats {
    return {
      campanha_id: Number(row.campanha_id ?? null),
      orcamento: Number(row.orcamento ?? null),
      custo_total: Number(row.custo_total ?? null),
      taxa_consumo_orcamento: Number(row.taxa_consumo_orcamento ?? null),
      ctr: Number(row.ctr ?? null),
      taxa_conversao: Number(row.taxa_conversao ?? null),
      cpa: Number(row.cpa ?? null),
      roas: Number(row.roas ?? null),
      roi: Number(row.roi ?? null),
      is_melhor_roi: Boolean(row.is_melhor_roi),
    };
  }
}
