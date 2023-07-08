import { Injectable } from '@nestjs/common';
import { TeknisiHistoryParams } from '@teknisi-user/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, ValinsProps } from 'src/ticket/utitlity';

@Injectable()
export class ValinsService {
    constructor(private prisma: PrismaService) { }

    async submit_valins(initalDto: RequestTicketDataProps, dto: ValinsProps) {
        const { job_id, idTelegram } = initalDto;
        const { valins_id, odp } = dto;
        try {
            const valins = await this.prisma.ticket_valins.create({
                data: {
                    valins_id,
                    odp,
                    idTelegram,
                    teknisi_job_id: job_id,
                }
            })

            if (valins) return {
                status: true,
                statusCode: 201,
                message: 'Submit Valins Successfull',
                data: valins
            };
        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal Server Error',
                data: e,
            };
        }
    }

    async get_valins_history(data: TeknisiHistoryParams) {
        const { skip, take, idTelegram, gte, lt } = data;
        try {
            const history = await this.prisma.ticket_valins.findMany({
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

            const count_history = await this.prisma.ticket_valins.count({
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
                message: 'Get history valins successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get history valins successfull',
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
