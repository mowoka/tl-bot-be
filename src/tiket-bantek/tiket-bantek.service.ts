import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { TeknisiHistoryParams } from '@teknisi-user/interface';
import { RequestTicketDataProps, TicketBantek } from '@ticket/utitlity';

@Injectable()
export class TiketBantekService {
    constructor(private prisma: PrismaService) { }

    async submit_tiket_bantek(intialDto: RequestTicketDataProps, dto: TicketBantek) {
        const { job_id, idTelegram } = intialDto;
        const { ticket_number, description, date, teknisi_bantek } = dto;

        try {
            const ticket_infra = await this.prisma.ticket_bantek.create({
                data: {
                    ticket_number,
                    description,
                    date,
                    teknisi_bantek,
                    idTelegram,
                    teknisi_job_id: job_id
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: 'Submit Ticket Bantek successfull',
                data: ticket_infra
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

    async get_ticket_bantek_history(data: TeknisiHistoryParams) {
        const { skip, take, idTelegram, gte, lt } = data;
        try {
            const history = await this.prisma.ticket_bantek.findMany({
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

            const count_history = await this.prisma.ticket_bantek.count({
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
                message: 'Get ticket bantek successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get ticket bantek successfull',
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
