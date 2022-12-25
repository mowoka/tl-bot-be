import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeknisiUser } from './dto';

@Injectable()
export class TeknisiUserService {
    constructor(private prisma: PrismaService) { }

    async get_teknisi_user() {
        try {
            const teknisi_user = await this.prisma.user_teknisi.findMany({
                orderBy: {
                    createAt: 'asc',
                }
            })

            if (teknisi_user) {
                return {
                    statusCode: 200,
                    status: true,
                    message: 'get teknisi user successfull',
                    data: { teknisi_user }
                }
            }
            return {
                statusCode: 500,
                status: false,
                message: 'Internal server error',
            }
        } catch (e) {
            throw e;
        }
    }

    async add_teknisi_user(dto: TeknisiUser) {
        try {
            const find_teknisi_user = await this.prisma.user_teknisi.findUnique({
                where: {
                    nik: dto.nik
                }
            })

            if (find_teknisi_user) return {
                statusCode: 406,
                message: 'Teknisi user already exist',
                status: false,
            };

            const teknisi_user = await this.prisma.user_teknisi.create({
                data: {
                    nik: dto.nik,
                    name: dto.name,
                    idTelegram: dto.idTelegram,
                    partner: dto.partner,
                    sector: dto.sector,
                    witel: dto.witel,
                    regional: dto.regional
                }
            })

            if (teknisi_user) return {
                status: true,
                statusCode: 200,
                message: 'Teknisi user create successfull',
                data: teknisi_user
            }

            return {
                status: false,
                statusCode: 500,
                message: 'Server internal error',
            }

        } catch (e) {
            throw e;
        }
    }
}
