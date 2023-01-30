import { Module } from '@nestjs/common';
import { TiketRegulerService } from './tiket-reguler.service';
import { TiketRedundantService } from 'src/tiket-redundant/tiket-redundant.service';


@Module({
  providers: [TiketRegulerService, TiketRedundantService]
})
export class TiketRegulerModule { }
