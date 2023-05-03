import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PromanProps, RequestTicketDataProps } from 'src/ticket/utitlity';

@Injectable()
export class PromanService {
    constructor(private prisma: PrismaService) { }

    async submit_proman(initalDto: RequestTicketDataProps, dto: PromanProps) {
        const { job_id, idTelegram } = initalDto
        const { odp_name, distribusi, capacity_port, status_port_use, status_port_available, odp_cradle, opm_length } = dto;
        try {
            const proman = await this.prisma.ticket_proman.create({
                data: {
                    odp_name,
                    distribusi,
                    capacity_port,
                    status_port_use,
                    status_port_available,
                    odp_cradle,
                    opm_length,
                    teknisi_job_id: job_id,
                    idTelegram
                }
            })
            return {
                status: true,
                statusCode: 200,
                message: 'Submit Ticket Proman Successfull',
                data: proman
            };
        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
                data: e,
            };
        }
    }

    async get_proman_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.ticket_proman.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            })

            const count_history = await this.prisma.ticket_proman.count({
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
                message: 'Get history proman successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: true,
                statusCode: 200,
                message: 'Get history proman successfull',
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
