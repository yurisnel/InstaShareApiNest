import { PROFILE_REPOSITORY } from '../../config/constants';
import { Profile } from './profile.entity';

export const ProfileProviders = [
  {
    provide: PROFILE_REPOSITORY,
    useValue: Profile,
  },
];
