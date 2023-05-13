import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { excludeTeamLeadUserField } from './utilities';
import { excludePartnerField, excludeRegionalField, excludeSectorField, excludeWitelField } from '@teknisi-user/utility';
import { TeamLeadUserParams } from './params';
import { generateParams } from '@core/utilities';
import { TeamLeadUserDto } from './dto';
import * as argon from 'argon2';


@Injectable()
export class TeamLeadUserService {
    constructor(private prisma: PrismaService) { }

    async get_team_lead_users(params: TeamLeadUserParams) {
        const { pagination } = generateParams(params.page);
        if (!params.partner_id) delete params.partner_id;
        if (!params.regional_id) delete params.regional_id;
        if (!params.sector_id) delete params.sector_id;
        if (!params.witel_id) delete params.witel_id;
        delete params.page;

        try {
            const [team_lead_users, count] = await Promise.all([
                await this.prisma.user.findMany({
                    skip: pagination.skip,
                    take: pagination.take,
                    where: {
                        ...params,
                        role: 'team-lead'
                    },
                    include: {
                        partner: true,
                        witel: true,
                        sector: true,
                        regional: true,
                    }
                }),
                await this.prisma.user.count({
                    where: {
                        ...params,
                        role: 'team-lead'
                    },
                })
            ])

            const exclude_team_lead_users = team_lead_users.map((user) => {
                return excludeTeamLeadUserField(user, ['password', 'createAt', 'updateAt', 'partner_id', 'sector_id', 'witel_id', 'regional_id'])
            })

            exclude_team_lead_users.map((user) => {
                return {
                    ...user,
                    partner: excludePartnerField(user.partner, ['createAt', 'updateAt', 'partner_code']),
                    sector: excludeSectorField(user.sector, ['createAt', 'updateAt', 'sector_code']),
                    witel: excludeWitelField(user.witel, ['createAt', 'updateAt', 'witel_code']),
                    regional: excludeRegionalField(user.regional, ['createAt', 'updateAt', 'regional_code']),
                }
            })

            const paginationValue = Math.ceil(count / 10);

            const metadata = {
                total: count,
                page: pagination.skip === 0 ? 1 : pagination.skip / 10 + 1,
                pagination: paginationValue === 0 ? 1 : paginationValue,
            };

            return {
                statusCode: 200,
                message: 'Get Team Lead User Successfull',
                status: true,
                data: {
                    data: exclude_team_lead_users,
                    metadata,
                }
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

    async add_team_lead_user(dto: TeamLeadUserDto) {
        const generatePasswordHash = await argon.hash(dto.password);

        try {
            const find_team_lead_user = await this.prisma.user.findUnique({
                where: {
                    nik: dto.nik,
                }
            })

            if (find_team_lead_user) return {
                statusCode: 400,
                message: 'User already exist',
                status: false,
            };


            const team_lead_user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    nik: dto.nik,
                    role: 'team-lead',
                    partner_id: dto.partner_id,
                    regional_id: dto.regional_id,
                    sector_id: dto.sector_id,
                    witel_id: dto.witel_id,
                    password: generatePasswordHash
                }
            })

            delete team_lead_user.password;

            return {
                statusCode: 201,
                message: 'Create Team Lead User Successfull',
                status: true,
                data: team_lead_user
            }

        } catch (e) {
            return {
                statusCode: 500,
                status: false,
                message: 'Internal Server Errror',
                data: e
            };
        }
    }
}
