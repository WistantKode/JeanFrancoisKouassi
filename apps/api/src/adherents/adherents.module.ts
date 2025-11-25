import { Module } from '@nestjs/common';
import { AdherentsController } from './adherents.controller';
import { AdherentsService } from './adherents.service';

@Module({
  controllers: [AdherentsController],
  providers: [AdherentsService]
})
export class AdherentsModule {}
