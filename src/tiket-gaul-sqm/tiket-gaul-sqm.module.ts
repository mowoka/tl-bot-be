import { Module } from '@nestjs/common';
import { TiketGaulSqmService } from './tiket-gaul-sqm.service';

@Module({
  providers: [TiketGaulSqmService]
})
export class TiketGaulSqmModule {}
