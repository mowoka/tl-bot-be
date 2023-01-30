import { Module } from '@nestjs/common';
import { TiketTeamLeadService } from './tiket-team-lead.service';
import { TiketTeamLeadController } from './tiket-team-lead.controller';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [TiketTeamLeadController],
  providers: [TiketTeamLeadService, JwtStrategy]
})
export class TiketTeamLeadModule { }
