import { AdminRolesGuard, JwtGuard } from '@auth/guards';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamLeadUserService } from './team-lead-user.service';
import { TeamLeadUserResponseType, TeamLeadUsersResponseType } from './types';
import { TeamLeadUserParams } from './params';
import { TeamLeadUserDto } from './dto';
import { BadRequestResponse, ErrorServerResponse } from '@core/types';

@ApiTags('Team Lead User')
@UseGuards(AdminRolesGuard)
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('team-lead-user')
export class TeamLeadUserController {
    constructor(private teamLeadUserServ: TeamLeadUserService) { }

    @Get()
    @ApiQuery({ name: 'partner_id', required: false })
    @ApiQuery({ name: 'regional_id', required: false })
    @ApiQuery({ name: 'sector_id', required: false })
    @ApiQuery({ name: 'witel_id', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiResponse({ status: 200, description: 'Get Team Lead User Successfull', type: TeamLeadUsersResponseType })
    get_team_lead_users(
        @Query('partner_id') partner_id?: string,
        @Query('regional_id') regional_id?: string,
        @Query('sector_id') sector_id?: string,
        @Query('witel_id') witel_id?: string,
        @Query('page') page?: string,
    ) {
        const params: TeamLeadUserParams = {
            partner_id: parseInt(partner_id) ?? 0,
            regional_id: parseInt(regional_id) ?? 0,
            sector_id: parseInt(sector_id) ?? 0,
            witel_id: parseInt(witel_id) ?? 0,
            page: page ?? '1',
        };
        return this.teamLeadUserServ.get_team_lead_users(params);
    }

    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Create Teknisi User Successfull', type: TeamLeadUserResponseType })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    add_team_lead_user(@Body('') dto: TeamLeadUserDto) {
        return this.teamLeadUserServ.add_team_lead_user(dto);
    }

}
