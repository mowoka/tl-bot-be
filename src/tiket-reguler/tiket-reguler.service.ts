import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, TicketRegularProps } from 'src/ticket/utitlity';
import { TiketRedundantService } from 'src/tiket-redundant/tiket-redundant.service';
import { TiketRedundantProps } from 'src/tiket-redundant/dto';

@Injectable()
export class TiketRegulerService {
    constructor(private prisma: PrismaService, private tiket_redundant_serv: TiketRedundantService) { }

    async submit_tiket_reguler(initDto: RequestTicketDataProps, dto: TicketRegularProps) {
        const { job_id, idTelegram } = initDto;
        const { insiden_number, speedy_number, customer_name, customer_phone, problem, description } = dto;
        const dateNow = Date.now();
        try {
            const find_ticket = await this.prisma.ticket_regular.findMany({
                where: {
                    speedy_number
                },
                orderBy: {
                    createAt: 'desc'
                }
            });


            if (find_ticket.length > 0) {
                const prevTiket = find_ticket[0];
                const prevDate = new Date(prevTiket.createAt).getTime();
                const countGapDate = dateNow - prevDate;
                const day = 1000 * 60 * 60 * 24;
                if ((countGapDate / day) < 60) {
                    // logic for add input user akan d kurangin
                    const sendData: TiketRedundantProps = {
                        insiden_number: insiden_number,
                        speedy_number: speedy_number,
                        customer_name: customer_name,
                        customer_phone: customer_phone,
                        problem: problem,
                        description: description,
                        job_id: job_id,
                        idTelegram: idTelegram,
                    }
                    // submit to tiket redundant
                    const res = await this.tiket_redundant_serv.submit_tiket_redundant(sendData);
                    if (res.statusCode === 200) {
                        return {
                            status: true,
                            statusCode: 200,
                            message: 'Create ticket reguler successfull',
                        }
                    }
                    // if (res.statusCode === 200) {
                    //     // submit tiket reguler
                    //     const tiket_reguler = await this.prisma.ticket_regular.create({
                    //         data: {
                    //             insiden_number,
                    //             speedy_number,
                    //             customer_name,
                    //             customer_number: customer_phone,
                    //             problem,
                    //             description,
                    //             idTelegram,
                    //             teknisi_job_id: job_id,
                    //         }
                    //     })

                    //     if (tiket_reguler) return {
                    //         status: true,
                    //         statusCode: 200,
                    //         message: 'Create ticket reguler successfull',
                    //         data: tiket_reguler
                    //     }

                    // } else {
                    //     return {
                    //         status: true,
                    //         statusCode: 403,
                    //         message: 'error submiting tiket redundant',
                    //     }
                    // }
                } else {
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
                        statusCode: 200,
                        message: 'Create ticket reguler successfull',
                        data: tiket_reguler
                    }
                }
            } else {
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
                    statusCode: 200,
                    message: 'Create ticket reguler successfull',
                    data: tiket_reguler
                }
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
                data: history,
                metadata
            }

            return {
                status: false,
                statusCode: 200,
                message: 'Get history tiket reguler successfull',
                data: [],
                metadata
            }

        } catch (e) {
            throw e;
        }
    }
}
