import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeknsiJob } from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TeknisiJobService {
    constructor(private prisma: PrismaService) { }

    async get_teknisi_job() {
        try {
            const find_teknisi_job_all = await this.prisma.teknisi_job.findMany()

            return {
                status: true,
                statusCode: 200,
                message: 'Job create successfull',
                data: find_teknisi_job_all
            };

        } catch (error) {
            throw error
        }
    }

    async get_teknisi_job_by_name(name: string) {
        try {
            const find_teknisi_job = await this.prisma.teknisi_job.findUnique({
                where: {
                    name: name
                }
            })

            if (find_teknisi_job) return {
                status: true,
                statusCode: 200,
                message: 'get teknisi succes',
                data: find_teknisi_job
            };

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server errror',
            };

        } catch (e) {
            throw e;
        }
    }

    async add_teknisi_job(dto: TeknsiJob) {

        try {
            const find_teknisi_job = await this.prisma.teknisi_job.findUnique({
                where: {
                    name: dto.name.toString()
                }
            })

            if (find_teknisi_job) return {
                status: false,
                statusCode: 406,
                message: 'Job already register',
            };

            const id = 'teknisi-job' + uuidv4();

            const create_teknisi_job = await this.prisma.teknisi_job.create({
                data: {
                    id: id,
                    name: dto.name,
                    point: dto.point
                }
            })
            if (create_teknisi_job) {
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Job create successfull',
                    data: create_teknisi_job
                };
            }

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server errror',
            };

        } catch (error) {
            throw error;
        }
    }
}
