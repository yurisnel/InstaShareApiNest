import { Injectable } from '@nestjs/common';
import { Dialect } from 'sequelize/types';
import configuration from './configuration';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    if (configuration().database.dialect == 'sqlite') {
      return {
        dialect: 'sqlite' as Dialect,
        storage: ':memory:',
      };
    }
    return configuration().database;
  }

  get jwtConfig() {
    return { privateKey: configuration().jwtPrivateKey };
  }
}
