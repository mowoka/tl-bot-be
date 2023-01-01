import { Injectable } from '@nestjs/common';
import { TiketRedundantProps } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TiketRedundantService {
    constructor(private prisma: PrismaService) { }

    async submit_tiket_redundant(dto: TiketRedundantProps) {
        const { job_id, idTelegram, insiden_number, speedy_number, customer_name, problem, description, } = dto
        try {
            const tiket_redundant = await this.prisma.ticket_redundant.create({
                data: {
                    insiden_number,
                    speedy_number,
                    customer_name,
                    problem,
                    description,
                    minus_point: 2,
                    job_id,
                    idTelegram
                }
            })

            if (tiket_redundant) return {
                status: true,
                statusCode: 200,
                message: 'Create tiket redundant successfull',
                data: tiket_redundant
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