import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegionalService } from './regional.service';
import { RegionalResponse, RegionalsResponse } from './types';
import { BadRequestResponse, ErrorServerResponse } from '@core/types';
import { RegionalDto } from './dto';
import { JwtGuard } from '@auth/guards';
import { AdminRolesGuard } from '@auth/guards/admin-role.guard';

@ApiTags('Regional')
@Controller('regional')
export class RegionalController {
    constructor(private regionalServ: RegionalService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Get Regional Successfull', type: RegionalsResponse })
    get_regional() {
        return this.regionalServ.get_regional();
    }

    @ApiBearerAuth()
    @UseGuards(AdminRolesGuard)
    @UseGuards(JwtGuard)
    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Create Regional Successfull', type: RegionalResponse })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    add_regional(@Body('') dto: RegionalDto) {
        return this.regionalServ.add_regional(dto);
    }
}
