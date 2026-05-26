import { Campanha } from 'typeORM/entities/Campanha';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Metrica } from 'typeORM/entities/Metrica';

const MIN_STARTING_DATE = new Date('2025-01-01');
const MAX_STARTING_DATE = new Date('2026-01-01');

const MIN_BUDGET = 100;
const MAX_BUDGET = 1000000;

const MIN_IMPRESSIONS = 100;
const MAX_IMPRESSIONS = 10000;

const MIN_CLICK_FACTOR = 0.4;
const MAX_CLICK_FACTOR = 0.8;

const MIN_CONVERSION_FACTOR = 0.2;
const MAX_CONVERSION_FACTOR = 0.6;

const MIN_COST_PER_CLICK = 0.1;
const MAX_COST_PER_CLICK = 10;

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
      faker.science.chemicalElement().name,
      faker.food.fruit(),
    ];

    return {
      id: Number.NaN,
      data_inicio: startDate,
      data_fim: endDate,
      orcamento: faker.number.float({ min: MIN_BUDGET, max: MAX_BUDGET }),
      nome: nameParts.join(' '),
      metricas: [],
    };
  }

  generateMetric(campaign: Campanha): Metrica {
    const impressions = faker.number.int({
      min: MIN_IMPRESSIONS,
      max: MAX_IMPRESSIONS,
    });
    const clicks = Math.floor(
      faker.number.float({ min: MIN_CLICK_FACTOR, max: MAX_CLICK_FACTOR }) *
        impressions,
    );
    const conversions = Math.floor(
      faker.number.float({
        min: MIN_CONVERSION_FACTOR,
        max: MAX_CONVERSION_FACTOR,
      }) * clicks,
    );

    return {
      id: Number.NaN,
      campanha_id: campaign.id,
      data_metrica: faker.date.between({
        from: campaign.data_inicio,
        to: campaign.data_fim,
      }),
      custo_por_clique: faker.number.float({
        min: MIN_COST_PER_CLICK,
        max: MAX_COST_PER_CLICK,
      }),
      impressoes: impressions,
      cliques: clicks,
      conversoes: conversions,
      campanha: campaign,
    };
  }

  generateManyCampaigns(amount: number): Campanha[] {
    if (!Number.isFinite(amount) || amount < 1) {
      throw Error('Invalid amount of campaigns to generate.');
    }

    const mocks: Campanha[] = [];
    for (let i = 0; i < amount; i++) {
      mocks.push(this.generateCampaign());
    }

    return mocks;
  }

  generateManyMetrics(campaign: Campanha, amount: number): Metrica[] {
    if (!Number.isFinite(amount) || amount < 1) {
      throw Error('Invalid amount of metrics to generate.');
    }

    const mocks: Metrica[] = [];
    for (let i = 0; i < amount; i++) {
      mocks.push(this.generateMetric(campaign));
    }

    return mocks;
  }
}
