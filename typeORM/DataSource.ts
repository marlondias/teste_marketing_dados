import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Campanha } from './entities/Campanha';
import { Metrica } from './entities/Metrica';

config({ path: '.env' });
const configService = new ConfigService();

export const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  cache: false,
  dropSchema: false,
  synchronize: false,
  entities: [Campanha, Metrica],
  migrationsTableName: 'zz_typeorm_migrations',
  migrationsTransactionMode: 'each',
  migrations: [],
});
