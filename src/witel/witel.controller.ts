import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WitelService } from './witel.service';
import { JwtGuard } from '@auth/guards';
import { AdminRolesGuard } from '@auth/guards/admin-role.guard';
import { WitelResponse, WitelsResponse } from './types';
import { BadRequestResponse, ErrorServerResponse } from '@core/types';
import { WitelDto } from './dto';

@ApiTags('Witel')
@Controller('witel')
export class WitelController {
    constructor(private witelServ: WitelService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Get Witel Successful', type: WitelsResponse })
    get_witel() {
        return this.witelServ.get_witel();
    }

    @ApiBearerAuth()
    @UseGuards(AdminRolesGuard)
    @UseGuards(JwtGuard)
    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Create Witel Successfull', type: WitelResponse })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse })
    add_witel(@Body('') dto: WitelDto) {
        return this.witelServ.add_witel(dto);
    }
}
