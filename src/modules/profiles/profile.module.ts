import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ProfileController } from './profile.controller';
import { ProfileProviders } from './profile.providers';
import { ProfileService } from './profile.service';

@Module({
  imports: [UsersModule],
  providers: [ProfileService, ...ProfileProviders],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
