import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SectorService } from './sector.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { SectorDto } from './dto';
import { SectorResponse, SectorsResponse } from './types';
import { BadRequestResponse, ErrorServerResponse } from '@core/types';
// import { AdminRolesGuard } from '@auth/guards/admin-role.guard';

@ApiTags('Sector')
@Controller('sector')
export class SectorController {
    constructor(private sectorServ: SectorService) { }

    // @UseGuards(AdminRolesGuard)
    @Get()
    @ApiResponse({ status: 200, description: 'Get Sector Successfull', type: SectorsResponse })
    get_sector() {
        return this.sectorServ.get_sector();
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Create Sector Successfull', type: SectorResponse })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    add_sector(@Body() dto: SectorDto) {
        return this.sectorServ.add_sector(dto);
    }
}
