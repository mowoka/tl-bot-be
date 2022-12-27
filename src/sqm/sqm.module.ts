import { Module } from '@nestjs/common';
import { SqmService } from './sqm.service';

@Module({
  providers: [SqmService]
})
export class SqmModule {}
