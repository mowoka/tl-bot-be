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
}
