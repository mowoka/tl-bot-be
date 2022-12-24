import { Module } from '@nestjs/common';
import { TeamLeaderJobController } from './team-leader-job.controller';
import { TeamLeaderJobService } from './team-leader-job.service';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [TeamLeaderJobController],
  providers: [TeamLeaderJobService, JwtStrategy]
})
export class TeamLeaderJobModule { }
