import { Injectable } from '@nestjs/common';
import { Action, Command, On, Start, Update, } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { REQUEST_TICKET_DATA, TICKET_LAPOR_LANGUSNG_DATA, TICKET_REGULER_DATA, TICKET_TUTUP_ODP_DATA, checkValidTicketData, placingMessageTicketData, resetTicketData, setRequestTicketData, validatorTicketData } from './utitlity';
import { TeknisiJobService } from 'src/teknisi-job/teknisi-job.service';
import { LaporLangsungService } from 'src/lapor-langsung/lapor-langsung.service';
import { TutupOdpService } from 'src/tutup-odp/tutup-odp.service';
import { TiketRegulerService } from 'src/tiket-reguler/tiket-reguler.service';

@Update()
@Injectable()
export class TicketService {
  constructor(private teknisi_service: TeknisiJobService, private lapor_langsung_service: LaporLangsungService, private tiket_reguler: TiketRegulerService, private tutup_odp: TutupOdpService) { }

  @Start()
  async startCommand(ctx: Context) {
    this.resetRequest();
    this.requesting(ctx);
    ctx.reply('Selamat datang di ION Bot', {
      parse_mode: 'Markdown',
      ...Markup.keyboard([
        '/start', '/help'
      ])
    })
  }

  @Command('help')
  async helpCommand(ctx: Context) {
    await ctx.reply('This bot help you to create ticket ION dashboard \n\n /start to intitilize request \n /help to see availabel command \n /reset reseting data request \n\n *contact admin if you have issue or major bug');
  }

  @Command('reset')
  async resetCommand(ctx: Context) {
    this.resetRequest();
    ctx.reply('reset requesting')
  }

  @On('message')
  async onMessage(ctx: Context) {
    if (ctx.message && 'text' in ctx.message) {
      const message = ctx.message.text;
      REQUEST_TICKET_DATA.idTelegram = ctx.message.chat.id.toString();
      await this.placingMessage(message);
      await this.requesting(ctx);

    } else {
      return ctx.reply('Please input your details');
    }
  }

  async resetRequest() {
    resetTicketData();
  }

  async placingMessage(message: string) {
    placingMessageTicketData(REQUEST_TICKET_DATA.job_name, message)
  }

  async requesting(ctx: Context) {
    if (!REQUEST_TICKET_DATA.job_name) {
      const teknisi_job = await this.teknisi_service.get_teknisi_job();
      const tempKeyboardList = [];
      teknisi_job.data.map((i) => {
        tempKeyboardList.push([Markup.button.callback(i.name, i.name)])
      })
      ctx.reply('Silahkan Pilih Tiket', {
        parse_mode: "HTML",
        ...Markup.inlineKeyboard(tempKeyboardList),
      })
    } else {
      await validatorTicketData(REQUEST_TICKET_DATA.job_name, ctx);
    }
  }

  @Action(['Tiket Reguler', 'Lapor Langsung', 'Tutup ODP', 'Valins', 'Unspect', 'Proman', 'SQM'])
  async requestAction(ctx: Context) {
    const res = await this.teknisi_service.get_teknisi_job_by_name(ctx.callbackQuery.data);
    REQUEST_TICKET_DATA.job_id = res.data.id;
    REQUEST_TICKET_DATA.job_name = res.data.name;
    await setRequestTicketData(res.data.name, ctx);
  }


  @Action('submit')
  async submit(ctx: Context) {
    const valid = checkValidTicketData(REQUEST_TICKET_DATA.job_name);
    if (!valid) {
      ctx.reply('Time out please use /start to start requesting again');
    } else {
      const { job_name } = REQUEST_TICKET_DATA;
      if (job_name === 'Tiket Reguler') {
        const res = await this.tiket_reguler.submit_tiket_reguler(REQUEST_TICKET_DATA, TICKET_REGULER_DATA);
        if (res.statusCode === 200) {
          await this.resetRequest()
          ctx.reply(res.message);
        } else {
          ctx.reply('failed request ticket to sistem \n contact to admin Developer');
        }
      } else if (job_name === 'Lapor Langsung') {
        const res = await this.lapor_langsung_service.submit_lapor_langsung(REQUEST_TICKET_DATA, TICKET_LAPOR_LANGUSNG_DATA);
        if (res.statusCode === 200) {
          await this.resetRequest()
          ctx.reply(res.message);
        } else {
          ctx.reply('failed request ticket to sistem \n contact to admin Developer');
        }
      } else if (job_name === 'Tutup ODP') {
        const res = await this.tutup_odp.submit_tutup_odp(REQUEST_TICKET_DATA, TICKET_TUTUP_ODP_DATA);
        if (res.statusCode === 200) {
          await this.resetRequest()
          ctx.reply(res.message);
        } else {
          ctx.reply('failed request ticket to sistem \n contact to admin Developer');
        }
      }
    }
  }

  @Action('cancel')
  async cancle(ctx: Context) {
    const valid = checkValidTicketData(REQUEST_TICKET_DATA.job_name);
    if (!valid) {
      ctx.reply('Time out please use /start to start requesting again');
    } else {
      this.resetRequest();
      ctx.reply('cancel submit');
    }
  }
}
