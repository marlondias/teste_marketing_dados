import { Campanha } from 'src/typeORM/entities/Campanha';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Metrica } from 'src/typeORM/entities/Metrica';
import { getDateWithAddedDays, getDifferenceInDays } from 'src/utils/DateUtils';

const MIN_STARTING_DATE = new Date('2026-01-01');
const MAX_STARTING_DATE = new Date('2026-05-01');
const MIN_BUDGET = 1000;
const MAX_BUDGET = 1000000;
const MIN_COST_PER_CLICK = 0.01;
const MAX_COST_PER_CLICK = 1;
const MAX_IMPRESSIONS = 100000;
const MAX_CLICK_FACTOR = 0.8;
const MAX_CONVERSION_FACTOR = 0.6;

@Injectable()
export class MockDataService {
  generateCampaign(): Campanha {
    const startDate = faker.date.between({
      from: MIN_STARTING_DATE,
      to: MAX_STARTING_DATE,
    });
    const currentDate = new Date();
    const endDate = faker.date.between({ from: startDate, to: currentDate });
    const nameParts = [
      faker.commerce.productAdjective(),
      faker.food.dish(),
      'by',
      faker.music.artist(),
    ];

    return {
      data_inicio: startDate,
      data_fim: endDate,
      orcamento: faker.number.float({ min: MIN_BUDGET, max: MAX_BUDGET }),
      nome: nameParts.join(' '),
      metricas: [],
    };
  }

  generateManyCampaigns(amount: number): Campanha[] {
    if (!Number.isFinite(amount) || amount < 1) {
      throw new BadRequestException('Invalid amount of campaigns to generate.');
    }

    const mocks: Campanha[] = [];
    for (let i = 0; i < amount; i++) {
      mocks.push(this.generateCampaign());
    }

    return mocks;
  }

  generateManyMetrics(campaign: Campanha): Metrica[] {
    const campaignDurationInDays = getDifferenceInDays(
      campaign.data_inicio,
      campaign.data_fim,
    );
    let remainingBudget = campaign.orcamento;
    const metrics: Metrica[] = [];

    for (let i = 0; i < campaignDurationInDays; i++) {
      const metric = this.generateMetric(campaign, remainingBudget, i);
      remainingBudget -= metric.custo_por_clique * metric.cliques;
      metrics.push(metric);
    }

    return metrics;
  }

  private generateMetric(
    campaign: Campanha,
    remainingBudget: number,
    daysSinceCampaignStarted: number,
  ): Metrica {
    const dateOfMeasurement = getDateWithAddedDays(
      campaign.data_inicio,
      daysSinceCampaignStarted,
    );

    const costPerClick = faker.number.float({
      min: MIN_COST_PER_CLICK,
      max: MAX_COST_PER_CLICK,
    });

    /* Mesmo sendo fictícia, a métrica não deve trazer informações inconsistentes com sua campanha.
     * Uma dessas inconsistências seria gastar mais em clicks do que o orçamento da campanha permitiria.
     * Para evitar isso, a quantidade de clicks é dependente do orçamento restante.
     * Quando acaba o orçamento de campanha, cessam os clicks, simulando a realidade.
     */
    const maxAffordableClicks = Math.floor(remainingBudget / costPerClick);
    if (maxAffordableClicks < 1) {
      return {
        campanha_id: campaign.id ?? Number.NaN,
        data_metrica: dateOfMeasurement,
        custo_por_clique: costPerClick,
        impressoes: 0,
        cliques: 0,
        conversoes: 0,
        campanha: campaign,
      };
    }

    /* Outra inconsistência seria ter uma quantidade de clicks maior que as impressões naquele anúncio.
     * Para evitar isso, há uma hierarquia nos valores: "impressoes > cliques > conversões".
     */
    const impressions = faker.number.int({
      max: Math.min(maxAffordableClicks, MAX_IMPRESSIONS),
    });
    const clicks = Math.floor(
      faker.number.float({ max: MAX_CLICK_FACTOR }) * impressions,
    );
    const conversions = Math.floor(
      faker.number.float({ max: MAX_CONVERSION_FACTOR }) * clicks,
    );

    return {
      campanha_id: campaign.id ?? Number.NaN,
      data_metrica: dateOfMeasurement,
      custo_por_clique: costPerClick,
      impressoes: impressions,
      cliques: clicks,
      conversoes: conversions,
      campanha: campaign,
    };
  }
}
