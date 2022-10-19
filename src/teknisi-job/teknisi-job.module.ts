import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategy';
import { TeknisiJobController } from './teknisi-job.controller';
import { TeknisiJobService } from './teknisi-job.service';

@Module({
  controllers: [TeknisiJobController],
  providers: [TeknisiJobService, JwtStrategy]
})
export class TeknisiJobModule {}
