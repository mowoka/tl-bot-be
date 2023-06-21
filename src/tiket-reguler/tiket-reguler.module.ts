import { Module } from '@nestjs/common';
import { TiketRegulerService } from './tiket-reguler.service';
import { TiketGaulRegulerService } from '@tiket-gaul-reguler/tiket-gaul-reguler.service';
import { TiketGaulSqmService } from '@tiket-gaul-sqm/tiket-gaul-sqm.service';
import { TiketGaulUsService } from '@tiket-gaul-us/tiket-gaul-us.service';


@Module({
  providers: [
    TiketRegulerService,
    TiketGaulRegulerService,
    TiketGaulSqmService,
    TiketGaulUsService,
  ],
})
export class TiketRegulerModule { }
