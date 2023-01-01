import { Module } from '@nestjs/common';
import { UnspectService } from './unspect.service';

@Module({
  providers: [UnspectService]
})
export class UnspectModule {}
