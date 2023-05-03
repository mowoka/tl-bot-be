import { Module } from '@nestjs/common';
import { KendalaSqmService } from './kendala-sqm.service';

@Module({
  providers: [KendalaSqmService]
})
export class KendalaSqmModule {}
