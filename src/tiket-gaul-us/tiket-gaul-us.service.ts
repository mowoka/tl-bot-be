import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { TicketUS } from '@ticket/utitlity';

@Injectable()
export class TiketGaulUsService {
    constructor(private prisma: PrismaService) { }

    async submit_tiket_gaul_us(job_id: string, idTelegram: string, dto: TicketUS) {
        const { speedy_number, description, date, odp } = dto
        try {

            const ticket_gaul_reguler = await this.prisma.ticket_gaul_us.create({
                data: {
                    speedy_number,
                    tanggal: date,
                    odp,
                    description,
                    idTelegram,
                    teknisi_job_id: job_id
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: 'Sumbit ticket gaul us successfull',
                data: ticket_gaul_reguler
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

    async get_ticket_gaul_us_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.ticket_gaul_us.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            });

            const count_history = await this.prisma.ticket_gaul_us.count({
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
                message: 'Get ticket gaul us successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get ticket gaul us successfull',
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
