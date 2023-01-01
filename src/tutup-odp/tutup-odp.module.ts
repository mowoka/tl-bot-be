import { Module } from '@nestjs/common';
import { TutupOdpService } from './tutup-odp.service';

@Module({
  providers: [TutupOdpService]
})
export class TutupOdpModule {}
