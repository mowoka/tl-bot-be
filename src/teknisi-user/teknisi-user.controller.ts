import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminRolesGuard, JwtGuard } from 'src/auth/guards';
import { TeknisiUserService } from './teknisi-user.service';
import { DeleteTeknisiUserDto, TeknisiUser } from './dto';
import { TeknisiUserHistoryParams, TeknisiUserParams, TeknisiUserReportParams } from './params';
import { BadRequestResponse, ErrorServerResponse } from '@core/types';
import { DeleteTeknisiUserResponse, MasterFilterResponseType, TeknisiUserResponseType } from './types';
import { TeknisiUsersResponseType } from './types/teknisi.users.response';

@ApiTags('Teknisi User')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('teknisi-user')
export class TeknisiUserController {
    constructor(private teknisi_user_service: TeknisiUserService) { }

    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Create Teknisi User Successfull', type: TeknisiUserResponseType })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    add_teknisi_user(@Body('') dto: TeknisiUser) {
        return this.teknisi_user_service.add_teknisi_user(dto);
    }

    @Get()
    @ApiQuery({ name: 'partner_id', required: false })
    @ApiQuery({ name: 'regional_id', required: false })
    @ApiQuery({ name: 'sector_id', required: false })
    @ApiQuery({ name: 'witel_id', required: false })
    @ApiQuery({ name: 'teknisi_lead_id', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiResponse({ status: 200, description: 'Get Teknisi User Successfull', type: TeknisiUsersResponseType })
    get_teknisi_user(
        @Query('partner_id') partner_id?: string,
        @Query('regional_id') regional_id?: string,
        @Query('sector_id') sector_id?: string,
        @Query('witel_id') witel_id?: string,
        @Query('teknisi_lead_id') teknisi_lead_id?: string,
        @Query('page') page?: string,
    ) {
        const params: TeknisiUserParams = {
            partner_id: parseInt(partner_id) ?? 0,
            regional_id: parseInt(regional_id) ?? 0,
            sector_id: parseInt(sector_id) ?? 0,
            witel_id: parseInt(witel_id) ?? 0,
            user_id: parseInt(teknisi_lead_id) ?? 0,
            page: page ?? '1',
        };
        return this.teknisi_user_service.get_teknisi_user(params);
    }

    @Get('/master-filters')
    @ApiResponse({ status: 200, description: 'Get Master Filter Successfull', type: MasterFilterResponseType })
    get_teknisi_user_filter() {
        return this.teknisi_user_service.get_teknisi_user_filter();
    }

    @Get('report')
    @ApiQuery({ name: 'partner_id', required: false })
    @ApiQuery({ name: 'regional_id', required: false })
    @ApiQuery({ name: 'sector_id', required: false })
    @ApiQuery({ name: 'witel_id', required: false })
    @ApiQuery({ name: 'teknisi_lead_id', required: false })
    @ApiQuery({ name: 'startDate', required: true })
    @ApiQuery({ name: 'endDate', required: true })
    @ApiQuery({ name: 'page', required: false })
    get_teknisi_user_report(
        @Query('partner_id') partner_id?: string,
        @Query('regional_id') regional_id?: string,
        @Query('sector_id') sector_id?: string,
        @Query('witel_id') witel_id?: string,
        @Query('teknisi_lead_id') teknisi_lead_id?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('page') page?: string,
    ) {
        const params: TeknisiUserReportParams = {
            partner_id: parseInt(partner_id) ?? 0,
            regional_id: parseInt(regional_id) ?? 0,
            sector_id: parseInt(sector_id) ?? 0,
            witel_id: parseInt(witel_id) ?? 0,
            user_id: parseInt(teknisi_lead_id) ?? 0,
            page: page ?? '1',
            createAt: {
                gte: new Date(startDate) ?? new Date(),
                lt: new Date(endDate) ?? new Date(),
            },
        };
        return this.teknisi_user_service.get_teknisi_user_report(params);
    }

    @Get('history')
    @ApiQuery({ name: 'user_id', required: true })
    @ApiQuery({ name: 'job_title', required: true })
    @ApiQuery({ name: 'startDate', required: true })
    @ApiQuery({ name: 'endDate', required: true })
    @ApiQuery({ name: 'page', required: false })
    get_teknisi_user_history(
        @Query('user_id') user_id: string,
        @Query('job_title') job_title: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('page') page?: string,
    ) {
        const params: TeknisiUserHistoryParams = {
            user_id: user_id ? parseInt(user_id) : 0,
            job_title: job_title,
            page: page ?? '1',
            createAt: {
                gte: new Date(startDate) ?? new Date(),
                lt: new Date(endDate) ?? new Date(),
            },
        };
        return this.teknisi_user_service.get_user_teknisi_history(params);
    }

    @UseGuards(AdminRolesGuard)
    @Delete()
    @ApiResponse({ status: 200, description: 'Delete Teknisi User Successfull', type: DeleteTeknisiUserResponse })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    delete_user_teknisi(@Body('') dto: DeleteTeknisiUserDto) {
        return this.teknisi_user_service.delete_user_teknisi(dto.teknisi_user_id);
    }
}
