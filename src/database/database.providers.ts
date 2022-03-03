import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/users/user.entity';
import { Post } from '../modules/posts/post.entity';
import { SEQUELIZE } from '../config/constants';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'src/modules/profiles/profile.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.get('DATABASE'));
      sequelize.addModels([User, Post, Profile]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
