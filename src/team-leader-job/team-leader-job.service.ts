import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamLeadJob } from './dto';
import { removeWhiteSpace } from '@core/utilities/remove_white_space';

@Injectable()
export class TeamLeaderJobService {
    constructor(private prisma: PrismaService) { }

    async get_team_lead_job() {
        try {
            const team_lead_job = await this.prisma.team_lead_job.findMany({})

            return {
                statusCode: 200,
                message: 'get team lead job successful',
                status: true,
                data: team_lead_job
            }

        } catch (e) {
            return {
                statusCode: 500,
                message: 'Internal server error',
                status: false,
                data: e,
            }

        }
    }

    async add_team_lead_job(dto: TeamLeadJob) {
        const team_lead_job_code = removeWhiteSpace(dto.name)
        try {
            const find_team_lead_job = await this.prisma.team_lead_job.findUnique({
                where: {
                    team_lead_job_code,
                }
            })

            if (find_team_lead_job) return {
                status: false,
                statusCode: 400,
                message: 'Job already register',
            }

            const create_team_lead_job = await this.prisma.team_lead_job.create({
                data: {
                    name: dto.name,
                    point: dto.point,
                    team_lead_job_code
                }
            })

            return {
                status: true,
                statusCode: 201,
                message: 'Create Team Lead Job Successfull',
                data: create_team_lead_job
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

}
