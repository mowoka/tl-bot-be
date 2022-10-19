import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { TeknsiJob } from './dto';
import { TeknisiJobService } from './teknisi-job.service';

@ApiTags('Teknisi-job')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('teknisi-job')
export class TeknisiJobController {
    constructor(private teknisijob:TeknisiJobService){}

    @Get()
    get_teknisi_job(){
        return this.teknisijob.get_teknisi_job()
    }

    @Post()
    add_teknisi_job(@Body('') dto:TeknsiJob){
        return this.teknisijob.add_teknisi_job(dto)
    }
}
