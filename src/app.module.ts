import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/AppController';
import { Campanha } from 'typeORM/entities/Campanha';
import { Metrica } from 'typeORM/entities/Metrica';
import { CampanhasController } from './controllers/CampanhasController';
import { CampaignsService } from './services/CampaignsService';
import { WebhookController } from './controllers/WebhookController';
import { MetricsService } from './services/MetricsService';
import { MockDataService } from './services/MockDataService';
import { CampaignStatsService } from './services/CampaignStatsService';
import { ReportGeneratorService } from './services/ReportGeneratorService';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Campanha, Metrica],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Campanha, Metrica]),
  ],
  controllers: [CampanhasController, WebhookController, AppController],
  providers: [
    CampaignsService,
    MetricsService,
    MockDataService,
    CampaignStatsService,
    ReportGeneratorService,
  ],
})
export class AppModule {}
