import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { TeknisiUserService } from './teknisi-user.service';
import { TeknisiUser } from './dto';
import { TeknisiUserParams } from './params';

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

    @Get('report')
    get_teknisi_user_report() {
        return this.teknisi_user_service.get_teknisi_user_report();
    }

    @Post()
    add_teknisi_user(@Body('') dto: TeknisiUser) {
        return this.teknisi_user_service.add_teknisi_user(dto);
    }
}
