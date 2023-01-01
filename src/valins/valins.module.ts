import { Module } from '@nestjs/common';
import { ValinsService } from './valins.service';

@Module({
  providers: [ValinsService]
})
export class ValinsModule {}
