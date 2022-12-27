import { Module } from '@nestjs/common';
import { PromanService } from './proman.service';

@Module({
  providers: [PromanService]
})
export class PromanModule {}
