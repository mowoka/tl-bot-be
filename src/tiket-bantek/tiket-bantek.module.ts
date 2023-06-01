import { Module } from '@nestjs/common';
import { TiketBantekService } from './tiket-bantek.service';

@Module({
  providers: [TiketBantekService]
})
export class TiketBantekModule {}
