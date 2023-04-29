import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { PartnerDto } from './dto';
import { removeWhiteSpace } from '@core/utilities/remove_white_space';

@Injectable()
export class PartnerService {
    constructor(private prismaServ: PrismaService) { }

    async get_partner() {
        try {
            const partners = await this.prismaServ.partner.findMany({});
            return {
                statusCode: 200,
                message: 'Get Partners Successfull',
                status: true,
                data: partners,
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

    async add_partner(dto: PartnerDto) {
        const partner_code = removeWhiteSpace(dto.name);
        try {
            const findPartner = await this.prismaServ.partner.findUnique({
                where: {
                    partner_code,
                }
            })

            if (findPartner) return {
                statusCode: 400,
                message: 'Partner Already Exist',
                status: false,
            }

            const partner = await this.prismaServ.partner.create({
                data: {
                    name: dto.name,
                    partner_code,
                }
            })

            return {
                statusCode: 201,
                message: 'Partner Success created',
                status: true,
                data: partner,
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
