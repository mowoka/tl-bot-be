import { Injectable } from '@nestjs/common';
import { KendalaSQMProps, RequestTicketDataProps } from '@ticket/utitlity';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class KendalaSqmService {
    constructor(private prisma: PrismaService) { }
    async submit_kendala_sqm(initalDto: RequestTicketDataProps, dto: KendalaSQMProps) {
        const { job_id, idTelegram } = initalDto
        const { insiden_number, speedy_number, customer_name, customer_number, problem, description } = dto;
        try {
            const kendalaSqm = await this.prisma.ticket_kendala_sqm.create({
                data: {
                    insiden_number,
                    speedy_number,
                    customer_name,
                    customer_number,
                    problem,
                    description,
                    teknisi_job_id: job_id,
                    idTelegram
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: 'Submit Kendala SQM Successfull',
                data: kendalaSqm
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

    async get_tiket_kendala_sqm_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.ticket_kendala_sqm.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            });

            const count_history = await this.prisma.ticket_kendala_sqm.count({
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
                message: 'Get ticket kendala successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get ticket kendala sqm successfull',
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
