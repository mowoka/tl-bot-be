import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { TiketTeamLead } from './dto';
import { TiketTeamLeadService } from './tiket-team-lead.service';

@ApiTags('Tiket Team Lead')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('tiket-team-lead')
export class TiketTeamLeadController {
    constructor(private tiket_team_lead: TiketTeamLeadService) { }

    @Post()
    add_tiket_lead(@Body('') dto: TiketTeamLead) {
        return this.tiket_team_lead.add_tiket_team_lead(dto);
    }
}
