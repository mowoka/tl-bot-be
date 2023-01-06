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

    async get_tiket_redundant_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.ticket_redundant.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            })

            const count_history = await this.prisma.ticket_redundant.count({
                where: { idTelegram: idTelegram }
            })

            const pagination = Math.ceil(count_history / 10);

            const metadata = {
                total: count_history,
                page: skip === 0 ? 1 : skip / 10 + 1,
                pagination: pagination === 0 ? 1 : pagination
            }


            if (history.length > 0) return {
                status: false,
                statusCode: 200,
                message: 'Get history tiket redundant successfull',
                data: history,
                metadata
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get history tiket redundant successfull',
                data: [],
                metadata
            }

        } catch (e) {
            throw e;
        }
    }
}   