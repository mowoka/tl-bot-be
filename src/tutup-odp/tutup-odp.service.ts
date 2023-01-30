import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, TutupOdpProps } from 'src/ticket/utitlity';

@Injectable()
export class TutupOdpService {
    constructor(private prisma: PrismaService) { }

    async submit_tutup_odp(initalDto: RequestTicketDataProps, dto: TutupOdpProps) {
        const { job_id, idTelegram } = initalDto;
        const { odp_address, odp_name } = dto;

        try {
            const tutup_odp = await this.prisma.tutup_odp.create({
                data: {
                    odp_name,
                    odp_address,
                    idTelegram,
                    teknisi_job_id: job_id,
                }
            })

            if (tutup_odp) return {
                status: true,
                statusCode: 200,
                message: 'Create tutup odp successfull',
                data: tutup_odp
            };

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
            };
        } catch (e) {
            throw e
        }
    }

    async get_tutup_odp_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.tutup_odp.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            })

            const count_history = await this.prisma.tutup_odp.count({
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
                message: 'Get history tutup odp successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get history tutup odp successfull',
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
