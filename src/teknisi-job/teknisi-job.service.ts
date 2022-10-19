import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeknsiJob } from './dto';

@Injectable()
export class TeknisiJobService {
    constructor(private prisma: PrismaService){}
    
    async get_teknisi_job(){
        try{
            const find_teknisi_job_all = await this.prisma.teknisi_job.findMany()

            return find_teknisi_job_all

        }catch(error){
            throw error
        }
    }

    async add_teknisi_job(dto: TeknsiJob){

        try{
            const find_teknisi_job = await this.prisma.teknisi_job.findUnique({
                where:{
                    name: dto.name.toString()
                }
            })

            if(find_teknisi_job) return {
                statusCode: 406,
                message: 'Job already register',
            };

            const create_teknisi_job = await this.prisma.teknisi_job.create({
                data:{
                    name: dto.name,
                    point: dto.point
                }
            })

            return create_teknisi_job;

        }catch(error){
            throw error;
        }
    }
}
