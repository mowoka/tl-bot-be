import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamLeadJob } from './dto';

@Injectable()
export class TeamLeaderJobService {
    constructor(private prisma: PrismaService) { }

    async get_team_lead_job() {
        try {
            const team_lead_job = await this.prisma.team_lead_job.findMany({})

            if (team_lead_job) {
                return {
                    statusCode: 200,
                    message: 'get team lead job successful',
                    status: true,
                    data: team_lead_job
                }
            }
            return {
                statusCode: 500,
                message: 'Internal server error',
                status: false,
            }

        } catch (e) {
            throw e
        }
    }

    async add_team_lead_job(dto: TeamLeadJob) {
        try {
            const find_team_lead_job = await this.prisma.team_lead_job.findUnique({
                where: {
                    name: dto.name.toLocaleLowerCase().toString()
                }
            })

            if (find_team_lead_job) return {
                status: false,
                statusCode: 406,
                message: 'Job already register',
            }

            const create_team_lead_job = await this.prisma.team_lead_job.create({
                data: {
                    name: dto.name,
                    point: dto.point
                }
            })

            if (create_team_lead_job) {
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Job create successfull',
                    data: create_team_lead_job
                };
            }

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server errror',
            };

        } catch (e) {
            throw e;
        }
    }

}
