import { USER_REPOSITORY } from '../../config/constants';
import { User } from './user.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
