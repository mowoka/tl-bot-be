import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, TicketSQMProps } from 'src/ticket/utitlity';

@Injectable()
export class SqmService {
    constructor(private prisma: PrismaService) { }

    async submit_sqm(initalDto: RequestTicketDataProps, dto: TicketSQMProps) {
        const { job_id, idTelegram } = initalDto;
        const { insiden_number, speedy_number, customer_name, customer_phone, problem, description } = dto;
        try {
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
                statusCode: 201,
                message: 'Submit sqm successfull',
                data: sqm
            };


        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
            };
        }
    }

    async get_sqm_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.ticket_sqm.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            })

            const count_history = await this.prisma.ticket_sqm.count({
                where: { idTelegram: idTelegram }
            })

            const pagination = Math.ceil(count_history / 10);

            const metadata = {
                total: count_history,
                page: skip === 0 ? 1 : skip / 10 + 1,
                pagination: pagination === 0 ? 1 : pagination
            }

            if (history.length > 0) return {
                status: true,
                statusCode: 200,
                message: 'Get history tiket SQM successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: true,
                statusCode: 200,
                message: 'Get history tiket SQM successfull',
                data: {
                    history,
                    metadata
                },
            }

        } catch (e) {
            throw e;
        }
    }
}
