import { Module } from '@nestjs/common';
import { TiketGaulRegulerService } from './tiket-gaul-reguler.service';

@Module({
  providers: [TiketGaulRegulerService]
})
export class TiketGaulRegulerModule {}
