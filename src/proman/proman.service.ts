import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PromanProps, RequestTicketDataProps } from 'src/ticket/utitlity';

@Injectable()
export class PromanService {
    constructor(private prisma: PrismaService) { }

    async submit_proman(initalDto: RequestTicketDataProps, dto: PromanProps) {
        const { job_id, idTelegram } = initalDto
        const { odp_name, distribusi, capacity_port, status_port_use, status_port_available, odp_cradle, opm_lenght } = dto;
        try {
            const proman = await this.prisma.proman.create({
                data: {
                    odp_name,
                    distribusi,
                    capacity_port: parseInt(capacity_port),
                    status_port_use: parseInt(status_port_use),
                    status_port_available: parseInt(status_port_available),
                    odp_cradle: parseInt(odp_cradle),
                    opm_length: parseInt(opm_lenght),
                    teknisi_job_id: job_id,
                    idTelegram
                }
            })
            if (proman) return {
                status: true,
                statusCode: 200,
                message: 'Create proman successfull',
                data: proman
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

    async get_proman_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.proman.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            })

            const count_history = await this.prisma.proman.count({
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
                data: history,
                metadata
            }

            return {
                status: true,
                statusCode: 200,
                message: 'Get history proman successfull',
                data: [],
                metadata
            }

        } catch (e) {
            throw e;
        }
    }
}
