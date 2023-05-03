import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { TiketTeamLeadDto } from './dto';
import { TiketTeamLeadService } from './tiket-team-lead.service';
import { ApiResponseType, BadRequestResponse, ErrorServerResponse } from '@core/types';

@ApiTags('Tiket Team Lead')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('tiket-team-lead')
export class TiketTeamLeadController {
    constructor(private tiket_team_lead: TiketTeamLeadService) { }

    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Input Tiket Team Lead Successfull', type: ApiResponseType })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    add_tiket_lead(@Body('') dto: TiketTeamLeadDto) {
        return this.tiket_team_lead.add_tiket_team_lead(dto);
    }
}
