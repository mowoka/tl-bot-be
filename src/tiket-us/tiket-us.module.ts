import { Module } from '@nestjs/common';
import { TiketUsService } from './tiket-us.service';

@Module({
  providers: [TiketUsService]
})
export class TiketUsModule {}
