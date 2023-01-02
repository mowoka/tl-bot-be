import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TiketTeamLead } from './dto';

@Injectable()
export class TiketTeamLeadService {
    constructor(private prisma: PrismaService) { }


    async add_tiket_team_lead(dto: TiketTeamLead) {
        try {
            const tiket_team_lead = await this.prisma.ticket_team_lead.create({
                data: {
                    teknisi_user_id: dto.teknisi_user_id,
                    team_lead_job_id: dto.jobId,
                    description: dto.keterangan,
                }
            })

            if (tiket_team_lead) return {
                status: true,
                statusCode: 200,
                message: 'create tiket team lead success full',
                data: tiket_team_lead
            }

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
            }

        } catch (e) {
            throw e
        }
    }
}
