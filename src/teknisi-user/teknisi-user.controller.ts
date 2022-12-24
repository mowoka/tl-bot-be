import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { TeknisiUserService } from './teknisi-user.service';
import { TeknisiUser } from './dto';

@ApiTags('Teknisi User')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('teknisi-user')
export class TeknisiUserController {
    constructor(private teknisi_user_service: TeknisiUserService) { }

    @Get()
    get_teknisi_user() {
        return this.teknisi_user_service.get_teknisi_user();
    }

    @Post()
    add_teknisi_user(@Body('') dto: TeknisiUser) {
        return this.teknisi_user_service.add_teknisi_user(dto);
    }
}
