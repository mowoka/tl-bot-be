import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeknisiUser } from './dto';
import { TeknisiUserHistoryParams, TeknisiUserParams, TeknisiUserReportParams } from './params';
import { User } from './type';
import { count_kpi } from './utility';
import { generateParams, generateParamsUserTeknisi, generateParamsUserTeknisiReport } from './utility/gen.params.history';
import { LaporLangsungService } from 'src/lapor-langsung/lapor-langsung.service';
import { TutupOdpService } from 'src/tutup-odp/tutup-odp.service';
import { TiketRegulerService } from 'src/tiket-reguler/tiket-reguler.service';
import { SqmService } from 'src/sqm/sqm.service';
import { PromanService } from 'src/proman/proman.service';
import { UnspectService } from 'src/unspect/unspect.service';
import { ValinsService } from 'src/valins/valins.service';
import { TiketRedundantService } from 'src/tiket-redundant/tiket-redundant.service';
import { TiketTeamLeadService } from 'src/tiket-team-lead/tiket-team-lead.service';

@Injectable()
export class TeknisiUserService {
    constructor(private prisma: PrismaService,
        private lapor_langsung_serv: LaporLangsungService,
        private tutup_odp_serv: TutupOdpService,
        private tiket_reguler_serv: TiketRegulerService,
        private tiket_sqm_serv: SqmService,
        private tiket_proman_serv: PromanService,
        private tiket_unspect_serv: UnspectService,
        private tiket_valins_serv: ValinsService,
        private tiket_redundant_serv: TiketRedundantService,
        private tiket_team_lead_serv: TiketTeamLeadService
    ) { }

    async get_teknisi_user(params: TeknisiUserParams) {
        const { pagination } = generateParamsUserTeknisi(params.page);
        if (!params.partner) delete params.partner
        if (!params.regional) delete params.regional
        if (!params.sector) delete params.sector
        delete params.page
        try {
            const teknisi_user = await this.prisma.user_teknisi.findMany({
                skip: pagination.skip,
                take: pagination.take,
                orderBy: {
                    createAt: 'asc',
                },
                where: { ...params }

            })

            const count_teknisi_user = await this.prisma.user_teknisi.count({ where: { ...params } })

            const paginationValue = Math.ceil(count_teknisi_user / 10);

            const metadata = {
                total: count_teknisi_user,
                page: pagination.skip === 0 ? 1 : pagination.skip / 10 + 1,
                pagination: paginationValue === 0 ? 1 : paginationValue
            }

            if (teknisi_user) {
                return {
                    statusCode: 200,
                    status: true,
                    message: 'get teknisi user successfull',
                    data: {
                        data: teknisi_user,
                        metadata
                    }
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

    async get_teknisi_user_filter() {
        try {

            const users = await this.prisma.user_teknisi.findMany({})

            if (users) {
                let tempPartner = [];
                let tempRegional = [];
                let tempSector = [];

                users.map((user) => {
                    tempPartner.push(user.partner)
                    tempRegional.push(user.regional)
                    tempSector.push(user.sector)
                })

                return {
                    statusCode: 200,
                    status: true,
                    message: 'get teknisi user filter successfull',
                    data:
                    {
                        partner: [... new Set(tempPartner)],
                        regional: [... new Set(tempRegional)],
                        sector: [... new Set(tempSector)],
                    }
                }
            }

            return {
                statusCode: 500,
                status: false,
                message: 'Internal server error',
            }
        } catch (e) {
            throw e
        }
    }

    async get_teknisi_user_report(params: TeknisiUserReportParams) {
        const { pagination } = generateParamsUserTeknisiReport(params.page);
        if (!params.partner) delete params.partner
        if (!params.regional) delete params.regional
        if (!params.sector) delete params.sector
        delete params.page

        try {
            const teknisi_users_report = await this.prisma.user_teknisi.findMany({
                skip: pagination.skip,
                take: pagination.take,
                orderBy: {
                    createAt: 'asc',
                },
                where: { ...params },
                include: {
                    lapor_langsung: {
                        include: {
                            job: true,
                            teknisi_user_telegram: true,
                        },
                    },
                    tutup_odp: {
                        include: {
                            job: true,
                            teknisi_user_telegram: true,
                        }
                    },
                    ticket_regular: {
                        include: {
                            job: true,
                            teknisi_user_telegram: true,
                        }
                    },
                    ticket_sqm: {
                        include: {
                            job: true,
                            teknisi_user_telegram: true,
                        }
                    },
                    proman: {
                        include: {
                            job: true,
                            teknisi_user_telegram: true,
                        }
                    },
                    unspect: {
                        include: {
                            job: true,
                            teknisi_user_telegram: true,
                        }
                    },
                    valins: {
                        include: {
                            job: true,
                            teknisi_user_telegram: true,
                        }
                    },
                    ticket_redundant: {
                        include: {
                            job: true,
                            teknisi_user_telegram: true,
                        }
                    },
                    ticket_team_lead: {
                        include: {
                            job: true,
                            teknisi: true,
                        }
                    },
                }
            })

            const count_teknisi_user_report = await this.prisma.user_teknisi.count({
                where: { ...params }
            })

            if (teknisi_users_report) {
                const teknisi_users: User[] = teknisi_users_report;
                const result = teknisi_users.map((user) => {
                    return count_kpi(user);
                })

                const paginationValue = Math.ceil(count_teknisi_user_report / 10);


                const metadata = {
                    total: count_teknisi_user_report,
                    page: pagination.skip === 0 ? 1 : pagination.skip / 10 + 1,
                    pagination: paginationValue === 0 ? 1 : paginationValue
                }



                return {
                    statusCode: 200,
                    status: true,
                    message: 'get teknisi user report successfull',
                    data: {
                        data: result,
                        metadata
                    }
                }
            }

            return {
                statusCode: 500,
                status: false,
                message: 'Internal server error',
            }

        } catch (e) {
            throw e
        }
    }

    async add_teknisi_user(dto: TeknisiUser) {
        try {
            const find_teknisi_user_by_nik = await this.prisma.user_teknisi.findUnique({
                where: {
                    nik: dto.nik
                }
            })

            if (find_teknisi_user_by_nik) return {
                statusCode: 406,
                message: 'Teknisi user already exist',
                status: false,
            };


            const find_teknisi_user_idTelegram = await this.prisma.user_teknisi.findUnique({
                where: {
                    nik: dto.idTelegram
                }
            })

            if (find_teknisi_user_idTelegram) return {
                statusCode: 406,
                message: 'id telegram already exist',
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
                message: 'Internal server error',
            }

        } catch (e) {
            throw e;
        }
    }

    async get_user_teknisi_history(params: TeknisiUserHistoryParams) {
        try {
            const teknisi_user = await this.prisma.user_teknisi.findUnique({
                where: {
                    nik: params.nik
                }
            })

            if (teknisi_user) {
                const { pagination } = generateParams(params);
                if (params.ticket_title === 'lapor_langsung') {
                    return this.lapor_langsung_serv.get_lapor_langsung_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
                } else if (params.ticket_title === 'tutup_odp') {
                    return this.tutup_odp_serv.get_tutup_odp_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
                } else if (params.ticket_title === 'tiket_reguler') {
                    return this.tiket_reguler_serv.get_tiket_reguler_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
                } else if (params.ticket_title === 'ticket_sqm') {
                    return this.tiket_sqm_serv.get_sqm_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
                } else if (params.ticket_title === 'proman') {
                    return this.tiket_proman_serv.get_proman_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
                } else if (params.ticket_title === 'unspect') {
                    return this.tiket_unspect_serv.get_unspect_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
                } else if (params.ticket_title === 'valins') {
                    return this.tiket_valins_serv.get_valins_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
                } else if (params.ticket_title === 'ticket_redundant') {
                    return this.tiket_redundant_serv.get_tiket_redundant_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
                } else {
                    return this.tiket_team_lead_serv.get_tiket_team_lead_history(pagination.skip, pagination.take, params.ticket_title, teknisi_user.id);
                }
            } else {
                return {
                    status: false,
                    statusCode: 400,
                    message: 'Teknisi user not found',
                }
            }

        } catch (e) {
            throw (e);
        }
    }
}
