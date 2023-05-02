import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminRolesGuard, JwtGuard } from 'src/auth/guards';
import { TeknsiJob } from './dto';
import { TeknisiJobService } from './teknisi-job.service';
import { TeknisiJobResponseType, TeknisiJobsResponseType } from './types';
import { BadRequestResponse, ErrorServerResponse } from '@core/types';

@ApiTags('Teknisi-job')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('teknisi-job')
export class TeknisiJobController {
    constructor(private teknisijob: TeknisiJobService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Get Teknisi Job Successfull', type: TeknisiJobsResponseType })
    get_teknisi_job() {
        return this.teknisijob.get_teknisi_job()
    }

    @UseGuards(AdminRolesGuard)
    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Create Teknisi Job Successfull', type: TeknisiJobResponseType })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    add_teknisi_job(@Body('') dto: TeknsiJob) {
        return this.teknisijob.add_teknisi_job(dto)
    }
}
