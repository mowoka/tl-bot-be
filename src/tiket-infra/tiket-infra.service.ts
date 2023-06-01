import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { RequestTicketDataProps, TicketInfra } from '@ticket/utitlity';

@Injectable()
export class TiketInfraService {
    constructor(private prisma: PrismaService) { }

    async submit_tiket_infra(intialDto: RequestTicketDataProps, dto: TicketInfra) {
        const { job_id, idTelegram } = intialDto;
        const { insiden_number, description, date } = dto;

        try {

        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal Server Error',
                data: e
            };
        }
    }
}
