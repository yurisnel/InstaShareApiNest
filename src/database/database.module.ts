import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { databaseProviders } from './database.providers';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [...databaseProviders, ConfigService, DatabaseService],
  exports: [...databaseProviders, DatabaseService],
})
export class DatabaseModule {}
