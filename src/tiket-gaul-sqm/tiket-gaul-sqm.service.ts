import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { TeknisiHistoryParams } from '@teknisi-user/interface';
import { TicketSQMProps } from '@ticket/utitlity';

@Injectable()
export class TiketGaulSqmService {
    constructor(private prisma: PrismaService) { }

    async submit_tiket_gaul_sqm(job_id: string, idTelegram: string, dto: TicketSQMProps) {
        const { customer_name, customer_phone, description, insiden_number, problem, speedy_number } = dto;
        try {
            const ticket_gaul_sqm = await this.prisma.ticket_gaul_sqm.create({
                data: {
                    insiden_number,
                    speedy_number,
                    customer_name,
                    customer_number: customer_phone,
                    problem,
                    description,
                    teknisi_job_id: job_id,
                    idTelegram,
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: 'Sumbit ticket gaul sqm successfull',
                data: ticket_gaul_sqm
            };
        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal Server Error',
                data: e
            };
        }
    }

    async get_ticket_gaul_sqm_history(data: TeknisiHistoryParams) {
        const { skip, take, idTelegram, gte, lt } = data;
        try {
            const history = await this.prisma.ticket_gaul_sqm.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram,
                    createAt: {
                        gte,
                        lt,
                    },
                }
            });

            const count_history = await this.prisma.ticket_gaul_sqm.count({
                skip,
                take,
                where: {
                    idTelegram: idTelegram,
                    createAt: {
                        gte,
                        lt,
                    },
                }
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
                message: 'Get ticket gaul sqm successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get ticket gaul sqm successfull',
                data: {
                    history,
                    metadata
                },
            }
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
