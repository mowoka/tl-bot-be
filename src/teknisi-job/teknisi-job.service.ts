import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeknsiJob } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { removeWhiteSpace } from '@core/utilities/remove_white_space';

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

        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal server errror',
                data: e
            };
        }
    }

    async get_teknisi_job_by_name(name: string) {
        const teknisi_job_code = removeWhiteSpace(name);
        try {
            const find_teknisi_job = await this.prisma.teknisi_job.findUnique({
                where: {
                    teknisi_job_code: teknisi_job_code
                }
            })

            if (find_teknisi_job) return {
                status: true,
                statusCode: 200,
                message: 'get teknisi successfull',
                data: find_teknisi_job
            };

        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal server errror',
                data: e
            };
        }
    }

    async add_teknisi_job(dto: TeknsiJob) {
        const teknisi_job_code = removeWhiteSpace(dto.name);
        try {
            const find_teknisi_job = await this.prisma.teknisi_job.findUnique({
                where: {
                    teknisi_job_code: teknisi_job_code
                }
            })

            if (find_teknisi_job) return {
                status: false,
                statusCode: 400,
                message: 'Job already register',
            };

            const id = uuidv4();

            const create_teknisi_job = await this.prisma.teknisi_job.create({
                data: {
                    id: id,
                    name: dto.name,
                    point: dto.point,
                    teknisi_job_code,
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: 'Create Teknisi Job Successfull',
                data: create_teknisi_job
            };
        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal server errror',
                data: e,
            };
        }
    }

    async get_ticket_action_name() {
        try {
            const teknisi_job = await this.prisma.teknisi_job.findMany({})
            return teknisi_job.map((item) => item.name);
        } catch (e) {
            console.log('get_ticket_action_name error', e);
            return [];
        }
    }
}
