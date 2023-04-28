import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectorDto } from './dto';
import { removeWhiteSpace } from '@core/utilities/remove_white_space';

@Injectable()
export class SectorService {
    constructor(private prismaServ: PrismaService) { }

    async get_sector() {
        try {
            const sectors = await this.prismaServ.sector.findMany({});
            return {
                statusCode: 200,
                message: 'Get Sectors Successfull',
                status: true,
                data: sectors,
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

    async add_sector(dto: SectorDto) {
        const sector_code = removeWhiteSpace(dto.name);

        try {
            const findSector = await this.prismaServ.sector.findUnique({
                where: {
                    sector_code,
                }
            });

            if (findSector) {
                return {
                    statusCode: 400,
                    message: 'Sector Already Exist',
                    status: false,
                }
            }

            const sector = await this.prismaServ.sector.create({
                data: {
                    name: dto.name,
                    sector_code
                }
            })

            return {
                statusCode: 201,
                message: 'Sector Success created',
                status: true,
                data: sector,
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

