import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTicketDataProps, TicketSQMProps } from 'src/ticket/utitlity';
import { TiketRedundantProps } from 'src/tiket-redundant/dto';
import { TiketRedundantService } from 'src/tiket-redundant/tiket-redundant.service';

@Injectable()
export class SqmService {
    constructor(private prisma: PrismaService, private tiket_redundant_serv: TiketRedundantService) { }

    async submit_sqm(initalDto: RequestTicketDataProps, dto: TicketSQMProps) {
        const { job_id, idTelegram } = initalDto;
        const { insiden_number, speedy_number, customer_name, customer_phone, problem, description } = dto;
        const dateNow = Date.now();
        try {
            const find_sqm = await this.prisma.ticket_sqm.findMany({
                where: {
                    speedy_number
                },
                orderBy: {
                    createAt: 'desc'
                }
            })

            if (find_sqm) {
                const prevSqm = find_sqm[0];
                const prevDate = new Date(prevSqm.createAt).getTime();
                const countGapDate = dateNow - prevDate;
                if (countGapDate < 60) {
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
                        const sqm = await this.prisma.ticket_sqm.create({
                            data: {
                                insiden_number,
                                speedy_number,
                                customer_name,
                                customer_number: customer_phone,
                                problem,
                                description,
                                teknisi_job_id: job_id,
                                idTelegram
                            }
                        })
                        if (sqm) return {
                            status: true,
                            statusCode: 200,
                            message: 'Create sqm successfull',
                            data: sqm
                        };
                    } else {
                        return {
                            status: true,
                            statusCode: 403,
                            message: 'error submiting tiket redundant',
                        }
                    }
                } else {
                    const sqm = await this.prisma.ticket_sqm.create({
                        data: {
                            insiden_number,
                            speedy_number,
                            customer_name,
                            customer_number: customer_phone,
                            problem,
                            description,
                            teknisi_job_id: job_id,
                            idTelegram
                        }
                    })
                    if (sqm) return {
                        status: true,
                        statusCode: 200,
                        message: 'Create sqm successfull',
                        data: sqm
                    };
                }
            } else {
                const sqm = await this.prisma.ticket_sqm.create({
                    data: {
                        insiden_number,
                        speedy_number,
                        customer_name,
                        customer_number: customer_phone,
                        problem,
                        description,
                        teknisi_job_id: job_id,
                        idTelegram
                    }
                })
                if (sqm) return {
                    status: true,
                    statusCode: 200,
                    message: 'Create sqm successfull',
                    data: sqm
                };
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
}
