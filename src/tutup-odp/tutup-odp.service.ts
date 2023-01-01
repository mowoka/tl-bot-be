import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, TutupOdpProps } from 'src/ticket/utitlity';

@Injectable()
export class TutupOdpService {
    constructor(private prisma: PrismaService) { }

    async submit_tutup_odp(initalDto: RequestTicketDataProps, dto: TutupOdpProps) {
        const { job_id, idTelegram } = initalDto;
        const { odp_address, odp_name } = dto;

        try {
            const tutup_odp = await this.prisma.tutup_odp.create({
                data: {
                    odp_name,
                    odp_address,
                    idTelegram,
                    teknisi_job_id: job_id,
                }
            })

            if (tutup_odp) return {
                status: true,
                statusCode: 200,
                message: 'Create tutup odp successfull',
                data: tutup_odp
            };

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
            };
        } catch (e) {
            throw e
        }
    }
}
