import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TiketTeamLeadDto } from './dto';

@Injectable()
export class TiketTeamLeadService {
    constructor(private prisma: PrismaService) { }


    async add_tiket_team_lead(dto: TiketTeamLeadDto) {
        try {
            const tiket_team_lead = await this.prisma.ticket_team_lead.create({
                data: {
                    teknisi_user_id: dto.teknisi_user_id,
                    team_lead_job_id: dto.jobId,
                    description: dto.keterangan,
                }
            })

            return {
                status: true,
                statusCode: 201,
                message: 'Input Tiket Team Lead Successfull',
            }
        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal Server Errror',
                data: e,
            }
        }
    }

    async get_tiket_team_lead_history(skip: number, take: number, job_name: string, userId: number) {
        try {
            const history = await this.prisma.ticket_team_lead.findMany({
                skip,
                take,
                where: {
                    teknisi_user_id: userId
                }
            })

            if (history.length > 0) {

                let tempHistory;

                if (job_name === 'gamastipea') {
                    tempHistory = history.filter((h) => h.team_lead_job_id == 1)
                } else if (job_name === 'gamastipeb') {
                    tempHistory = history.filter((h) => h.team_lead_job_id == 2)
                } else if (job_name === 'gamastipec') {
                    tempHistory = history.filter((h) => h.team_lead_job_id == 3)
                } else {
                    tempHistory = history.filter((h) => h.team_lead_job_id == 4)
                }

                const pagination = Math.ceil(tempHistory.length / 10);

                const metadata = {
                    total: tempHistory.length,
                    page: skip === 0 ? 1 : skip / 10 + 1,
                    pagination: pagination === 0 ? 1 : pagination
                }

                return {
                    status: true,
                    statusCode: 200,
                    message: `Get history ${job_name} successfull`,
                    data: {
                        history: tempHistory,
                        metadata
                    },
                }
            }

            const metadata = {
                total: 1,
                page: skip === 0 ? 1 : skip / 10 + 1,
                pagination: 1
            }

            return {
                status: true,
                statusCode: 200,
                message: `Get history ${job_name} successfull`,
                data: {
                    history,
                    metadata
                },
            }

        } catch (e) {
            throw e;
        }
    }
}
