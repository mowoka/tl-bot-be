import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminRolesGuard, JwtGuard } from 'src/auth/guards';
import { TeamLeaderJobService } from './team-leader-job.service';
import { TeamLeadJob } from './dto';
import { TeamLeadJobResponseType, TeamLeadJobsResponseType } from './types';
import { BadRequestResponse, ErrorServerResponse } from '@core/types';

@ApiTags('Team Leader Job')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('team-leader-job')
export class TeamLeaderJobController {
    constructor(private team_lead_job_service: TeamLeaderJobService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Get Team Lead Job Successfull', type: TeamLeadJobsResponseType })
    get_team_lead_job() {
        return this.team_lead_job_service.get_team_lead_job();
    }

    @UseGuards(AdminRolesGuard)
    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Create Regional Successfull', type: TeamLeadJobResponseType })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    add_team_lead_job(@Body('') dto: TeamLeadJob) {
        return this.team_lead_job_service.add_team_lead_job(dto);
    }
}
