import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeknisiUser } from './dto';
import { TeknisiUserHistoryParams, TeknisiUserParams, TeknisiUserReportParams } from './params';
import { User } from './interface';
import { count_kpi, excludePartnerField, excludeRegionalField, excludeSectorField, excludeWitelField } from './utility';
import {
  generateParamUserHistory,
  generateParamsUserTeknisi,
  generateParamsUserTeknisiReport,
} from './utility/gen.params.history';
import { LaporLangsungService } from 'src/lapor-langsung/lapor-langsung.service';
import { TutupOdpService } from 'src/tutup-odp/tutup-odp.service';
import { TiketRegulerService } from 'src/tiket-reguler/tiket-reguler.service';
import { SqmService } from 'src/sqm/sqm.service';
import { PromanService } from 'src/proman/proman.service';
import { UnspectService } from 'src/unspect/unspect.service';
import { ValinsService } from 'src/valins/valins.service';
import { TiketTeamLeadService } from 'src/tiket-team-lead/tiket-team-lead.service';
import { excludeUserField } from '@auth/utilities';


@Injectable()
export class TeknisiUserService {
  constructor(
    private prisma: PrismaService,
    private lapor_langsung_serv: LaporLangsungService,
    private tutup_odp_serv: TutupOdpService,
    private tiket_reguler_serv: TiketRegulerService,
    private tiket_sqm_serv: SqmService,
    private tiket_proman_serv: PromanService,
    private tiket_unspect_serv: UnspectService,
    private tiket_valins_serv: ValinsService,
    private tiket_team_lead_serv: TiketTeamLeadService,
  ) { }

  async get_teknisi_user(params: TeknisiUserParams) {
    const { pagination } = generateParamsUserTeknisi(params.page);
    if (!params.partner_id) delete params.partner_id;
    if (!params.regional_id) delete params.regional_id;
    if (!params.sector_id) delete params.sector_id;
    if (!params.witel_id) delete params.witel_id;
    if (!params.user_id) delete params.user_id;
    delete params.page;

    try {
      const teknisi = await Promise.all([
        await this.prisma.user_teknisi.findMany({
          skip: pagination.skip,
          take: pagination.take,
          orderBy: {
            createAt: 'desc',
          },
          include: {
            partner: true,
            regional: true,
            sector: true,
            witel: true,
            user: true,
          },
          where: { ...params },
        }),
        await this.prisma.user_teknisi.count({
          where: { ...params },
        })
      ])
      const excludeUser = teknisi[0].map((user) => excludeUserField(user, ['createAt', 'updateAt', 'partner_id', 'sector_id', 'witel_id', 'regional_id', 'user_id']))

      excludeUser.map((user) => {
        return {
          ...user,
          partner: excludePartnerField(user.partner, ['createAt', 'updateAt', 'partner_code']),
          sector: excludeSectorField(user.sector, ['createAt', 'updateAt', 'sector_code']),
          witel: excludeWitelField(user.witel, ['createAt', 'updateAt', 'witel_code']),
          regional: excludeRegionalField(user.regional, ['createAt', 'updateAt', 'regional_code']),
          user: excludeUserField(user.user, ['createAt', 'updateAt', 'partner_id', 'sector_id', 'witel_id', 'regional_id', 'password']),
        }
      })
      const paginationValue = Math.ceil(teknisi[1] / 10);

      const metadata = {
        total: teknisi[1],
        page: pagination.skip === 0 ? 1 : pagination.skip / 10 + 1,
        pagination: paginationValue === 0 ? 1 : paginationValue,
      };

      if (teknisi) {
        return {
          statusCode: 200,
          status: true,
          message: 'Get Teknisi User Successfull',
          data: {
            data: teknisi[0],
            metadata,
          },
        };
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

  async get_teknisi_user_filter() {
    try {
      const data = await Promise.all([
        await this.prisma.regional.findMany({}),
        await this.prisma.sector.findMany({}),
        await this.prisma.partner.findMany({}),
        await this.prisma.witel.findMany({}),
      ]);

      const sector = data[1].map(e => excludeSectorField(e, ['createAt', 'updateAt', 'sector_code']))
      const regional = data[0].map(e => excludeRegionalField(e, ['createAt', 'updateAt', 'regional_code']))
      const partner = data[2].map(e => excludePartnerField(e, ['createAt', 'updateAt', 'partner_code']))
      const witel = data[3].map(e => excludeWitelField(e, ['createAt', 'updateAt', 'witel_code']))

      if (data) {
        return {
          statusCode: 200,
          status: true,
          message: 'get teknisi user filter successfull',
          data: {
            regional: regional,
            sector: sector,
            partner: partner,
            witel: witel,
          },
        };
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

  async get_teknisi_user_report(params: TeknisiUserReportParams) {
    const { pagination } = generateParamsUserTeknisiReport(params.page);
    const paramsParent = params;
    const paramsChild = { ...params.createAt };
    if (!params.partner_id) delete paramsParent.partner_id;
    if (!params.regional_id) delete paramsParent.regional_id;
    if (!params.sector_id) delete paramsParent.sector_id;
    if (!params.witel_id) delete paramsParent.witel_id;
    delete paramsParent.createAt;
    delete params.page;

    try {
      const teknisi_users_report = await this.prisma.user_teknisi.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: {
          createAt: 'desc',
        },
        where: { ...paramsParent },
        include: {
          ticket_lapor_langsung: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_tutup_odp: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_regular: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_sqm: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_proman: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_unspect: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_valins: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_kendala_sqm: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_bantek: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_infra: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_us: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_team_lead: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi: true,
            },
          },
          ticket_gaul_reguler: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_gaul_sqm: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
          ticket_gaul_us: {
            where: {
              createAt: { ...paramsChild },
            },
            include: {
              job: true,
              teknisi_user_telegram: true,
            },
          },
        },
      });

      const count_teknisi_user_report = await this.prisma.user_teknisi.count({
        where: { ...params },
      });

      if (teknisi_users_report) {
        const teknisi_users: User[] = teknisi_users_report;
        const result = teknisi_users.map((user) => {
          return count_kpi(user);
        });

        const paginationValue = Math.ceil(count_teknisi_user_report / 10);

        const metadata = {
          total: count_teknisi_user_report,
          page: pagination.skip === 0 ? 1 : pagination.skip / 10 + 1,
          pagination: paginationValue === 0 ? 1 : paginationValue,
        };

        return {
          statusCode: 200,
          status: true,
          message: 'get teknisi user report successfull',
          data: {
            data: result,
            metadata,
          },
        };
      }
    } catch (e) {
      return {
        statusCode: 500,
        status: false,
        message: 'Internal server error',
        data: e
      };
    }
  }

  async add_teknisi_user(dto: TeknisiUser) {
    try {
      const find_teknisi_user_by_nik = await this.prisma.user_teknisi.findUnique({
        where: {
          nik: dto.nik,
        },
      });

      const find_teknisi_user_idTelegram = await this.prisma.user_teknisi.findUnique({
        where: {
          nik: dto.idTelegram,
        },
      });

      if (find_teknisi_user_by_nik || find_teknisi_user_idTelegram) return {
        statusCode: 400,
        message: 'Teknisi User Already Exist',
        status: false,
      };

      const teknisi_user = await this.prisma.user_teknisi.create({
        data: {
          nik: dto.nik,
          name: dto.name,
          idTelegram: dto.idTelegram,
          partner_id: dto.partner_id,
          sector_id: dto.sector_id,
          witel_id: dto.witel_id,
          regional_id: dto.regional_id,
          user_id: dto.user_id
        },
      });

      return {
        status: true,
        statusCode: 201,
        message: 'Teknisi user create successfull',
        data: teknisi_user,
      };

    } catch (e) {
      return {
        status: false,
        statusCode: 500,
        message: 'Internal Server Errror',
        data: e,
      };
    }
  }

  async get_user_teknisi_history(params: TeknisiUserHistoryParams) {
    try {
      const teknisi_user = await this.prisma.user_teknisi.findUnique({
        where: {
          id: params.user_id,
        },
      });

      if (!teknisi_user) return {
        status: false,
        statusCode: 400,
        message: 'Teknisi user not found',
      };

      const { pagination } = generateParamUserHistory(params);
      if (params.job_title === 'laporlangsung') {
        return this.lapor_langsung_serv.get_lapor_langsung_history(
          pagination.skip,
          pagination.take,
          teknisi_user.idTelegram,
        );
      } else if (params.job_title === 'tutupodp') {
        return this.tutup_odp_serv.get_tutup_odp_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
      } else if (params.job_title === 'tiketreguler') {
        return this.tiket_reguler_serv.get_tiket_reguler_history(
          pagination.skip,
          pagination.take,
          teknisi_user.idTelegram,
        );
      } else if (params.job_title === 'tiketsqm') {
        return this.tiket_sqm_serv.get_sqm_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
      } else if (params.job_title === 'proman') {
        return this.tiket_proman_serv.get_proman_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
      } else if (params.job_title === 'unspect') {
        return this.tiket_unspect_serv.get_unspect_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
      } else if (params.job_title === 'valins') {
        return this.tiket_valins_serv.get_valins_history(pagination.skip, pagination.take, teknisi_user.idTelegram);
      } else {
        return this.tiket_team_lead_serv.get_tiket_team_lead_history(
          pagination.skip,
          pagination.take,
          params.job_title,
          teknisi_user.id,
        );
      }
    } catch (e) {
      return {
        status: false,
        statusCode: 500,
        message: 'Internal Server Errror',
        data: e,
      };
    }
  }

  async check_user_teknisi(idTelegram: string) {
    try {
      const user_teknisi_available = await this.prisma.user_teknisi.findUnique({
        where: {
          idTelegram: idTelegram,
        },
      });
      if (user_teknisi_available) return true;
      return false;
    } catch (e) {
      console.log('error chek user teknisi', e);
      return false;
    }
  }
}
