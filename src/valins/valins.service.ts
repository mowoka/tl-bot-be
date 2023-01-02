import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, ValinsProps } from 'src/ticket/utitlity';

@Injectable()
export class ValinsService {
    constructor(private prisma: PrismaService) { }

    async submit_valins(initalDto: RequestTicketDataProps, dto: ValinsProps) {
        const { job_id, idTelegram } = initalDto;
        const { valins_id, odp } = dto;
        try {
            const valins = await this.prisma.valins.create({
                data: {
                    valins_id,
                    odp,
                    idTelegram,
                    teknisi_job_id: job_id,
                }
            })

            if (valins) return {
                status: true,
                statusCode: 200,
                message: 'Create valins successfull',
                data: valins
            };

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
            };
        } catch (e) {
            throw (e);
        }
    }
}
