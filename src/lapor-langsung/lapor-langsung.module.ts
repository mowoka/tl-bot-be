import { Module } from '@nestjs/common';
import { LaporLangsungService } from './lapor-langsung.service';

@Module({
  providers: [LaporLangsungService]
})
export class LaporLangsungModule {}
