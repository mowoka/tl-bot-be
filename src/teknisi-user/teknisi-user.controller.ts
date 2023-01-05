import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { TeknisiUserService } from './teknisi-user.service';
import { TeknisiUser } from './dto';
import { TeknisiUserHistoryParams, TeknisiUserParams, TeknisiUserReportParams } from './params';

@ApiTags('Teknisi User')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('teknisi-user')
export class TeknisiUserController {
    constructor(private teknisi_user_service: TeknisiUserService) { }

    @Get()
    @ApiQuery({ name: 'partner', required: false })
    @ApiQuery({ name: 'regional', required: false })
    @ApiQuery({ name: 'sector', required: false })
    get_teknisi_user(@Query('partner') partner?: string, @Query('regional') regional?: string, @Query('sector') sector?: string) {
        const params: TeknisiUserParams = {
            partner: partner ?? '',
            regional: regional ?? '',
            sector: sector ?? ''
        }
        return this.teknisi_user_service.get_teknisi_user(params);
    }

    @Get('/master-filters')
    get_teknisi_user_filter() {
        return this.teknisi_user_service.get_teknisi_user_filter();
    }

    @Post()
    add_teknisi_user(@Body('') dto: TeknisiUser) {
        return this.teknisi_user_service.add_teknisi_user(dto);
    }

    @Get('report')
    @ApiQuery({ name: 'partner', required: false })
    @ApiQuery({ name: 'regional', required: false })
    @ApiQuery({ name: 'sector', required: false })
    @ApiQuery({ name: 'startDate', required: true })
    @ApiQuery({ name: 'endDate', required: true })
    get_teknisi_user_report(@Query('partner') partner?: string, @Query('regional') regional?: string, @Query('sector') sector?: string, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string,) {
        const params: TeknisiUserReportParams = {
            partner: partner ?? '',
            regional: regional ?? '',
            sector: sector ?? '',
            createAt: {
                gte: new Date(startDate) ?? new Date(),
                lt: new Date(endDate) ?? new Date(),
            }
        }
        return this.teknisi_user_service.get_teknisi_user_report(params);
    }

    @Get('history')
    @ApiQuery({ name: 'nik', required: true })
    @ApiQuery({ name: 'ticket_title', required: true })
    @ApiQuery({ name: 'page', required: false })
    get_teknisi_user_history(@Query('nik') nik: string, @Query('ticket_title') ticket_title: string, @Query('page') page?: string) {
        const params: TeknisiUserHistoryParams = {
            nik: nik,
            ticket_title,
            page: page ?? '1'
        }
        console.log(params);
        return this.teknisi_user_service.get_user_teknisi_history(params);
    }

}
