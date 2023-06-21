import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, TicketRegularProps, TicketSQMProps, TicketUS } from 'src/ticket/utitlity';
import { TiketGaulSqmService } from '@tiket-gaul-sqm/tiket-gaul-sqm.service';
import { TiketGaulRegulerService } from '@tiket-gaul-reguler/tiket-gaul-reguler.service';
import { TiketGaulUsService } from '@tiket-gaul-us/tiket-gaul-us.service';

@Injectable()
export class TiketRegulerService {
    constructor(
        private prisma: PrismaService,
        private ticket_gaul_reguler: TiketGaulRegulerService,
        private ticket_gaul_sqm: TiketGaulSqmService,
        private ticket_gaul_us: TiketGaulUsService,
    ) { }

    async submit_tiket_reguler(initDto: RequestTicketDataProps, dto: TicketRegularProps) {
        const { job_id, idTelegram } = initDto;
        const { insiden_number, speedy_number, customer_name, customer_phone, problem, description } = dto;
        const dateNow = Date.now();
        try {
            const [ticket_regulers, ticket_sqms, ticket_uss] = await Promise.all([
                // get ticket reguler
                await this.prisma.ticket_regular.findMany({
                    where: {
                        speedy_number
                    },
                    orderBy: {
                        createAt: 'desc'
                    }
                }),
                // get ticket sqm
                await this.prisma.ticket_sqm.findMany({
                    where: {
                        speedy_number
                    },
                    orderBy: {
                        createAt: 'desc',
                    }
                }),
                // get ticket us
                await this.prisma.ticket_us.findMany({
                    where: {
                        speedy_number,
                    },
                    orderBy: {
                        createAt: 'desc'
                    }
                })
            ]);
            // logic for check if sqm tiket available < 60 days
            // check SQM tike
            if (ticket_sqms.length > 0) {
                const prevTiket = ticket_sqms[0];
                const prevDate = new Date(prevTiket.createAt).getTime();
                const countGapDate = dateNow - prevDate;
                const day = 1000 * 60 * 60 * 24;
                if ((countGapDate / day) < 60) {
                    const sendData: TicketSQMProps = {
                        insiden_number: insiden_number,
                        speedy_number: speedy_number,
                        customer_name: customer_name,
                        customer_phone: customer_phone,
                        problem: problem,
                        description: description,
                    }
                    try {
                        await this.ticket_gaul_sqm.submit_tiket_gaul_sqm(job_id, prevTiket.idTelegram, sendData);
                    } catch (e) {
                        console.log('error submit tiket gaul sqm', e);
                        return {
                            status: false,
                            statusCode: 500,
                            message: 'error submit tiket gaul sqm',
                            data: e
                        };
                    }

                }

            }

            // logic for check if tiket reguler available < 60 days
            // check Reguler tiket
            if (ticket_regulers.length > 0) {
                const prevTiket = ticket_regulers[0];
                const prevDate = new Date(prevTiket.createAt).getTime();
                const countGapDate = dateNow - prevDate;
                const day = 1000 * 60 * 60 * 24;
                if ((countGapDate / day) < 60) {
                    // logic for add input user akan d kurangin
                    const sendData: TicketRegularProps = {
                        insiden_number: insiden_number,
                        speedy_number: speedy_number,
                        customer_name: customer_name,
                        customer_phone: customer_phone,
                        problem: problem,
                        description: description,
                    }
                    try {
                        await this.ticket_gaul_reguler.submit_tiket_gaul_reguler(job_id, prevTiket.idTelegram, sendData);
                    } catch (e) {
                        console.log('error submit tiket gaul reguler', e);
                        return {
                            status: false,
                            statusCode: 500,
                            message: 'error submit tiket gaul reguler',
                            data: e
                        };
                    }
                }
            }

            // logic for check if tiket reguler available < 60 days
            // check US tiket
            if (ticket_uss.length > 0) {
                const prevTiket = ticket_uss[0];
                const prevDate = new Date(prevTiket.createAt).getTime();
                const countGapDate = dateNow - prevDate;
                const day = 1000 * 60 * 60 * 24;
                if ((countGapDate / day) < 60) {
                    // logic for add input user akan d kurangin
                    const sendData: TicketUS = {
                        speedy_number: speedy_number,
                        description: description,
                        odp: prevTiket.odp,
                        date: prevTiket.tanggal,
                    }
                    try {
                        await this.ticket_gaul_us.submit_tiket_gaul_us(job_id, prevTiket.idTelegram, sendData);
                    } catch (e) {
                        console.log('error submit tiket gaul us', e);
                        return {
                            status: false,
                            statusCode: 500,
                            message: 'error submit tiket gaul us',
                            data: e
                        };
                    }
                }
            }

            // logic jika tidak ada tiket terkait maka buat submit baru
            const tiket_reguler = await this.prisma.ticket_regular.create({
                data: {
                    insiden_number,
                    speedy_number,
                    customer_name,
                    customer_number: customer_phone,
                    problem,
                    description,
                    idTelegram,
                    teknisi_job_id: job_id,
                }
            })

            if (tiket_reguler) return {
                status: true,
                statusCode: 201,
                message: 'Create ticket reguler successfull',
                data: tiket_reguler
            }

            return {
                status: false,
                statusCode: 500,
                message: 'Internal server error',
            };

        } catch (e) {
            throw e;
        }
    }

    async get_tiket_reguler_history(skip: number, take: number, idTelegram: string) {
        try {
            const history = await this.prisma.ticket_regular.findMany({
                skip,
                take,
                where: {
                    idTelegram: idTelegram
                }
            })

            const count_history = await this.prisma.ticket_regular.count({
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
                message: 'Get history tiket reguler successfull',
                data: {
                    history,
                    metadata
                },
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get history tiket reguler successfull',
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
