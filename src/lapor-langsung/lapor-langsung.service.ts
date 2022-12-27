import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LaporLangsungProps, RequestTicketDataProps } from 'src/ticket/utitlity';

@Injectable()
export class LaporLangsungService {
    constructor(private prisma: PrismaService) { }

    async submit_lapor_langsung(initalDto: RequestTicketDataProps, dto: LaporLangsungProps) {
        const { idTelegram, job_id } = initalDto;
        const { speedy_number, customer_name, customer_phone, problem, description } = dto
        try {
            const lapor_langsung = await this.prisma.lapor_langsung.create({
                data: {
                    speedy_number,
                    customer_name,
                    customer_phone,
                    problem,
                    description,
                    idTelegram,
                    teknisi_job_id: job_id
                }
            })

            if (lapor_langsung) return {
                status: true,
                statusCode: 200,
                message: 'Create lapor langsung successfull',
                data: lapor_langsung
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
