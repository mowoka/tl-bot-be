import { Module } from '@nestjs/common';
import { WitelController } from './witel.controller';
import { WitelService } from './witel.service';

@Module({
  controllers: [WitelController],
  providers: [WitelService]
})
export class WitelModule {}
