import { Injectable } from '@nestjs/common';
import { Campanha } from 'typeORM/entities/Campanha';
import { Metrica } from 'typeORM/entities/Metrica';
import { CampaignStats } from './CampaignStatsService';
import { Readable } from 'stream';
import * as fastcsv from 'fast-csv';

type CampaignForReport = Omit<Campanha, 'metricas'> &
  Omit<CampaignStats, 'campanha_id' | 'orcamento' | 'is_melhor_roi'>;

type MetricForReport = Omit<Metrica, 'campanha_id' | 'campanha'>;

type JsonReportPayload = {
  campanha: CampaignForReport;
  metricas: MetricForReport[];
};

@Injectable()
export class ReportGeneratorService {
  constructor() {}

  async generateCampaignReportAsJson(
    campaign: Campanha,
    campaignStats: CampaignStats,
    metrics: Metrica[],
  ): Promise<Readable> {
    const reportPayload = this.getJsonPayload(campaign, campaignStats, metrics);
    const jsonString = JSON.stringify(reportPayload, null, 2);

    return Readable.from([jsonString]);
  }

  async generateCampaignReportAsCsv(
    campaign: Campanha,
    campaignStats: CampaignStats,
    metrics: Metrica[],
  ): Promise<Readable> {
    throw new Error('Not implemented'); //FIXME
  }

  private getJsonPayload(
    campaign: Campanha,
    campaignStats: CampaignStats,
    metrics: Metrica[],
  ): JsonReportPayload {
    const { metricas, ...campaignProps } = campaign;
    const { campanha_id, orcamento, is_melhor_roi, ...campaignStatsProps } =
      campaignStats;

    return {
      campanha: { ...campaignProps, ...campaignStatsProps },
      metricas: metrics.map((metric): MetricForReport => {
        const { campanha_id, campanha, ...props } = metric;
        return props;
      }),
    };
  }

  private getCsvPayload(
    campaign: Campanha,
    campaignStats: CampaignStats,
    metrics: Metrica[],
  ): void {
    const { campanha } = this.getJsonPayload(campaign, campaignStats, []);
    //TODO: incompleto
  }
}
