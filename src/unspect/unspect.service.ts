import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, UnspectProps } from 'src/ticket/utitlity';

@Injectable()
export class UnspectService {
    constructor(private prisma: PrismaService) { }

    async submit_unspect(initalDto: RequestTicketDataProps, dto: UnspectProps) {
        const { job_id, idTelegram } = initalDto;
        const { speedy_number, odp, problem, description } = dto;

        try {
            const unspect = await this.prisma.ticket_unspect.create({
                data: {
                    speedy_number,
                    odp,
                    problem,
                    description,
                    idTelegram,
                    teknisi_job_id: job_id
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: 'Submit tiket unspect successfull',
                data: unspect
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

    async get_unspect_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.ticket_unspect.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            })

            const count_history = await this.prisma.ticket_unspect.count({
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
                message: 'Get history unspect successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get history unspect successfull',
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
