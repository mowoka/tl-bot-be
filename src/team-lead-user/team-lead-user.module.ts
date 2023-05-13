import { Module } from '@nestjs/common';
import { TeamLeadUserController } from './team-lead-user.controller';
import { TeamLeadUserService } from './team-lead-user.service';

@Module({
  controllers: [TeamLeadUserController],
  providers: [TeamLeadUserService]
})
export class TeamLeadUserModule {}
