import { Injectable } from '@nestjs/common';
import { KendalaSQMProps, RequestTicketDataProps } from '@ticket/utitlity';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class KendalaSqmService {
    constructor(private prisma: PrismaService) { }
    async submit_proman(initalDto: RequestTicketDataProps, dto: KendalaSQMProps) {
        const { job_id, idTelegram } = initalDto
        const { insiden_number, speedy_number, customer_name, customer_number, problem, description } = dto;
        try {
            const kendalaSqm = await this.prisma.ticket_kendala_sqm.create({
                data: {
                    insiden_number,
                    speedy_number,
                    customer_name,
                    customer_number,
                    problem,
                    description,
                    teknisi_job_id: job_id,
                    idTelegram
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: 'Submit Kendala SQM Successfull',
                data: kendalaSqm
            };
        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
                data: e,
            };
        }
    }
}
