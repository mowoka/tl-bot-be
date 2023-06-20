import { Module } from '@nestjs/common';
import { TiketGaulUsService } from './tiket-gaul-us.service';

@Module({
  providers: [TiketGaulUsService]
})
export class TiketGaulUsModule {}
