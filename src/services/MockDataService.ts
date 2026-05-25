import { Campanha } from "typeORM/entities/Campanha"
import { Metrica } from "typeORM/entities/Metrica";

export class MockDataService {
  public generateMockCampaign(): Promise<Campanha> {
		//TODO
		throw new Error('Not implemented');
	}

	public async generateMockMetric(campaign: Campanha): Promise<Metrica> {
		//TODO
		throw new Error('Not implemented');
	}

}
