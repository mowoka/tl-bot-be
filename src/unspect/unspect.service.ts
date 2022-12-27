import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, UnspectProps } from 'src/ticket/utitlity';

@Injectable()
export class UnspectService {
    constructor(private prisma: PrismaService) { }

    async submit_unspect(initalDto: RequestTicketDataProps, dto: UnspectProps) {
        const { job_id, idTelegram } = initalDto;
        const { speedy_number, odp, problem, description } = dto;

        try {
            const unspect = await this.prisma.unspect.create({
                data: {
                    speedy_number,
                    odp,
                    problem,
                    description,
                    idTelegram,
                    teknisi_job_id: job_id
                }
            })

            if (unspect) return {
                status: true,
                statusCode: 200,
                message: 'Create unspect successfull',
                data: unspect
            };

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
            };
        } catch (e) {
            throw e;
        }
    }
}
