import { Module } from '@nestjs/common';
import { TiketRedundantService } from './tiket-redundant.service';

@Module({
  providers: [TiketRedundantService]
})
export class TiketRedundantModule {}
