import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { FilesController } from './files.controller';

@Module({
  imports: [    
    UsersModule,
  ],
  controllers: [FilesController],
})
export class FilesModule {}
