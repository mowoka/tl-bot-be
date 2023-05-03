import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LaporLangsungProps, RequestTicketDataProps } from 'src/ticket/utitlity';

@Injectable()
export class LaporLangsungService {
    constructor(private prisma: PrismaService) { }

    async submit_lapor_langsung(initalDto: RequestTicketDataProps, dto: LaporLangsungProps) {
        const { idTelegram, job_id } = initalDto;
        const { speedy_number, customer_name, customer_phone, problem, description } = dto
        try {
            const lapor_langsung = await this.prisma.lapor_langsung.create({
                data: {
                    speedy_number,
                    customer_name,
                    customer_phone,
                    problem,
                    description,
                    idTelegram,
                    teknisi_job_id: job_id
                }
            })

            return {
                status: true,
                statusCode: 201,
                message: 'Submit Lapor Langsung Successfull',
                data: lapor_langsung
            };
        } catch (e) {
            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
                data: e
            };
        }
    }

    async get_lapor_langsung_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.lapor_langsung.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            })

            const count_history = await this.prisma.lapor_langsung.count({
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
                message: 'Get history lapor langsung successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: true,
                statusCode: 200,
                message: 'Get history lapor langsung successfull',
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
