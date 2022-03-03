import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { ProfileController } from './profile.controller';
import { ProfileProviders } from './profile.providers';
import { ProfileService } from './profile.service';

@Module({
  imports: [UsersModule, DatabaseModule, UsersModule],
  providers: [ProfileService, ...ProfileProviders],
  controllers: [ProfileController],
  exports: [ProfileService, ...ProfileProviders],
})
export class ProfileModule {}
