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
            const ticket_infra = await this.prisma.ticket_infra.create({
                data: {
                    insiden_number,
                    description,
                    date,
                    idTelegram,
                    teknisi_job_id: job_id
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: 'Submit Ticket Infra successfull',
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

    async get_tiket_infra_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.ticket_infra.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            });

            const count_history = await this.prisma.ticket_infra.count({
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
                message: 'Get ticket infra successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get ticket infra successfull',
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
