import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PartnerService } from './partner.service';
import { PartnerResponse, PartnersResponse } from './types';
import { BadRequestResponse, ErrorServerResponse } from '@core/types';
import { PartnerDto } from './dto';
import { JwtGuard } from '@auth/guards';
import { AdminRolesGuard } from '@auth/guards/admin-role.guard';

@ApiTags('Partner')
@Controller('partner')
export class PartnerController {
    constructor(private partnerServ: PartnerService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Get Partner Successfull', type: PartnersResponse })
    get_partner() {
        return this.partnerServ.get_partner();
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @UseGuards(AdminRolesGuard)
    @Post()
    @ApiCreatedResponse({ status: 201, description: 'Create Partner Successfull', type: PartnerResponse })
    @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
    @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
    add_partner(@Body('') dto: PartnerDto) {
        return this.partnerServ.add_partner(dto);
    }
}
