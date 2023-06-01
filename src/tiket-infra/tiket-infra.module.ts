import { Module } from '@nestjs/common';
import { TiketInfraService } from './tiket-infra.service';

@Module({
  providers: [TiketInfraService]
})
export class TiketInfraModule {}
