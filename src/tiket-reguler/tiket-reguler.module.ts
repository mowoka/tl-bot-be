import { Module } from '@nestjs/common';
import { TiketRegulerService } from './tiket-reguler.service';
import { TiketRedundantService } from 'src/tiket-redundant/tiket-redundant.service';
import { SqmService } from 'src/sqm/sqm.service';

@Module({
  providers: [TiketRegulerService, TiketRedundantService, SqmService]
})
export class TiketRegulerModule { }
