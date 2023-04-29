import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { WitelDto } from './dto';
import { removeWhiteSpace } from '@core/utilities/remove_white_space';

@Injectable()
export class WitelService {
    constructor(private prismaServ: PrismaService) { }

    async get_witel() {
        try {
            const witels = await this.prismaServ.witel.findMany({});
            return {
                statusCode: 200,
                message: 'Get Witels Successfull',
                status: true,
                data: witels,
            }
        } catch (e) {
            return {
                statusCode: 500,
                message: 'Internal Server Error',
                status: false,
                data: e,
            }
        }
    }

    async add_witel(dto: WitelDto) {
        const witel_code = removeWhiteSpace(dto.name);
        try {
            const findWitel = await this.prismaServ.witel.findUnique({
                where: {
                    witel_code,
                }
            })

            if (findWitel) return {
                statusCode: 400,
                message: 'Witel Already Exist',
                status: false,
            }

            const witel = await this.prismaServ.witel.create({
                data: {
                    name: dto.name,
                    witel_code,
                }
            })

            return {
                statusCode: 201,
                message: 'Witel Success created',
                status: true,
                data: witel,
            }

        } catch (e) {
            return {
                statusCode: 500,
                message: 'Internal Server Error',
                status: false,
                data: e,
            }
        }
    }
}
