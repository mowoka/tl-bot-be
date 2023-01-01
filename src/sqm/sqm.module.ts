import { Module } from '@nestjs/common';
import { SqmService } from './sqm.service';
import { TiketRedundantService } from 'src/tiket-redundant/tiket-redundant.service';

@Module({
  providers: [SqmService, TiketRedundantService]
})
export class SqmModule { }
