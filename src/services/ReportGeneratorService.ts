import { Injectable } from '@nestjs/common';
import { Campanha } from 'typeORM/entities/Campanha';
import { Metrica } from 'typeORM/entities/Metrica';
import { Readable } from 'stream';
import { CampaignStats } from 'typeORM/entities/CampaignStats';

type CampaignForReport = Omit<Campanha, 'metricas'> &
  Omit<CampaignStats, 'campanha_id' | 'is_melhor_roi'>;

type MetricForReport = Omit<Metrica, 'campanha_id' | 'campanha'>;

type JsonReportPayload = {
  campanha: CampaignForReport;
  metricas: MetricForReport[];
};

@Injectable()
export class ReportGeneratorService {
  constructor() {}

  generateCampaignReportAsJson(
    campaign: Campanha,
    campaignStats: CampaignStats,
    metrics: Metrica[],
  ): Readable {
    const reportPayload = this.getJsonPayload(campaign, campaignStats, metrics);
    const jsonString = JSON.stringify(reportPayload, null, 2);

    return Readable.from([jsonString]);
  }

  private getJsonPayload(
    campaign: Campanha,
    campaignStats: CampaignStats,
    metrics: Metrica[],
  ): JsonReportPayload {
    const { metricas, ...campaignProps } = campaign;
    const { campanha_id, is_melhor_roi, ...campaignStatsProps } = campaignStats;

    return {
      campanha: { ...campaignProps, ...campaignStatsProps },
      metricas: metrics.map((metric): MetricForReport => {
        const { campanha_id, campanha, ...props } = metric;
        return props;
      }),
    };
  }
}
