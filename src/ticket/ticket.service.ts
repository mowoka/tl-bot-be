import { Injectable } from '@nestjs/common';
import { Action, Command, On, Start, Update, } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Markup } from 'telegraf';
import { REQUEST_TICKET_DATA, REQUEST_TIKET, RequestTiketProps, setRequestTicketData, validationRequestTicket } from './utitlity';
import { v4 as uuidv4 } from 'uuid';
import { TeknisiJobService } from 'src/teknisi-job/teknisi-job.service';

@Update()
@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService, private teknisi_service: TeknisiJobService) { }

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
      console.log(REQUEST_TICKET_DATA)
      await this.placingMessage(message);
      await this.requesting(ctx);
    } else {
      return ctx.reply('Please input your details');
    }
  }

  async resetRequest() {
    REQUEST_TICKET_DATA.job_id = ''
    REQUEST_TICKET_DATA.job_name = ''
  }

  async placingMessage(message: string) {

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
    }
  }

  @Action(['Tiket Reguler', 'Lapor Langsung', 'Tutup ODP', 'Valins', 'Unspect', 'Proman', 'SQM'])
  async requestAction(ctx: Context) {
    const res = await this.teknisi_service.get_teknisi_job_by_name(ctx.callbackQuery.data);
    REQUEST_TICKET_DATA.job_id = res.data.id;
    REQUEST_TICKET_DATA.job_name = res.data.name;
    setRequestTicketData(res.data.name, ctx);
  }


  @Action('submit')
  async submit(ctx: Context) {
    const valid = validationRequestTicket();
    if (!valid) {
      ctx.reply('Time out please use /start to start requesting again');
    } else {
      // const res = await this.submitTicket(REQUEST_TIKET);
      // if (res.statusCode === 200) {
      //   await this.resetRequest()
      //   await ctx.reply('success request ticket to sistem', {
      //     parse_mode: 'Markdown',
      //     ...Markup.keyboard([
      //       '/start', '/help'
      //     ])
      //   });
      // } else {
      ctx.reply('failed request ticket to sistem');
      // }
    }
  }

  @Action('cancel')
  async cancle(ctx: Context) {
    const valid = validationRequestTicket();
    if (!valid) {
      ctx.reply('Time out please use /start to start requesting again');
    } else {
      this.resetRequest();
      ctx.reply('cancel submit');
    }
  }


}
