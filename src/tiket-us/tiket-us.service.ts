import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { TeknisiHistoryParams } from '@teknisi-user/interface';
import { RequestTicketDataProps, TicketUS } from '@ticket/utitlity';

@Injectable()
export class TiketUsService {
    constructor(private prisma: PrismaService) { }

    async submit_tiket_us(intialDto: RequestTicketDataProps, dto: TicketUS) {
        const { job_id, idTelegram } = intialDto;
        const { speedy_number, odp, description, date } = dto;

        try {
            const ticket_us = await this.prisma.ticket_us.create({
                data: {
                    speedy_number,
                    odp,
                    description,
                    tanggal: date,
                    idTelegram,
                    teknisi_job_id: job_id,
                }
            })

            return {
                status: true,
                statusCode: 201,
                message: 'Submit ticket us successfull',
                data: ticket_us
            };

        } catch (e) {
            console.log(e);
            return {
                status: false,
                statusCode: 500,
                message: 'Internal Server Error',
                data: e
            };
        }
    }

    async get_ticket_us_history(data: TeknisiHistoryParams) {
        const { skip, take, idTelegram, gte, lt } = data;
        try {
            const history = await this.prisma.ticket_us.findMany({
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

            const count_history = await this.prisma.ticket_us.count({
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
                message: 'Get ticket us successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get ticket us successfull',
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
