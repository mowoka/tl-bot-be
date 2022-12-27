import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, TicketSQMProps } from 'src/ticket/utitlity';

@Injectable()
export class SqmService {
    constructor(private prisma: PrismaService) { }

    async submit_sqm(initalDto: RequestTicketDataProps, dto: TicketSQMProps) {
        const { job_id, idTelegram } = initalDto;
        const { insiden_number, speedy_number, customer_name, customer_phone, problem, description } = dto;

        const sqm = await this.prisma.ticket_sqm.create({
            data: {
                insiden_number,
                speedy_number,
                customer_name,
                customer_number: customer_phone,
                problem,
                description,
                teknisi_job_id: job_id,
                idTelegram
            }
        })
        if (sqm) return {
            status: true,
            statusCode: 200,
            message: 'Create sqm successfull',
            data: sqm
        };

        return {
            status: false,
            statusCode: 500,
            message: 'Internal server error',
        };
    }
}
