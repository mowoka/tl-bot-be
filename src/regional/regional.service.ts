import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { RegionalDto } from './dto';
import { removeWhiteSpace } from '@core/utilities/remove_white_space';

@Injectable()
export class RegionalService {
    constructor(private prisma: PrismaService) { }

    async get_regional() {
        try {
            const regionals = await this.prisma.regional.findMany({});
            return {
                statusCode: 200,
                message: 'Get Regional Successfull',
                status: true,
                data: regionals,
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

    async add_regional(dto: RegionalDto) {
        const regional_code = removeWhiteSpace(dto.name);

        try {
            const findRegional = await this.prisma.regional.findUnique({
                where: {
                    regional_code,
                }
            })

            if (findRegional) return {
                statusCode: 400,
                message: 'Regional Already Exist',
                status: false,
            }

            const regional = await this.prisma.regional.create({
                data: {
                    name: dto.name,
                    regional_code,
                }
            })

            return {
                statusCode: 201,
                message: 'Regional Success created',
                status: true,
                data: regional,
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
