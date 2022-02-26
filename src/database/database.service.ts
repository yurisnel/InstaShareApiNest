import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../config/constants';

@Injectable()
export class DatabaseService {
  constructor(@Inject(SEQUELIZE) private readonly sequelize: Sequelize) {}

  async emptyDb(): Promise<void> {
    await this.sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
  }
}
