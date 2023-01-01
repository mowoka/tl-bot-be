import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { TeamLeaderJobService } from './team-leader-job.service';
import { TeamLeadJob } from './dto';

@ApiTags('Team Leader Job')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('team-leader-job')
export class TeamLeaderJobController {
    constructor(private team_lead_job_service: TeamLeaderJobService) { }

    @Get()
    get_team_lead_job() {
        return this.team_lead_job_service.get_team_lead_job();
    }

    @Post()
    add_team_lead_job(@Body('') dto: TeamLeadJob) {
        return this.team_lead_job_service.add_team_lead_job(dto);
    }
}
