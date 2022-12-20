import { Injectable } from '@nestjs/common';
import { Action, Command, On, Start, Update, } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Markup } from 'telegraf';
import { REQUEST_TIKET, validationRequestTicket } from './utitlity';
import { uuid } from 'uuidv4';

@Update()
@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) { }

  @Start()
  async startCommand(ctx: Context) {
    this.resetRequest();
    this.requesting(ctx);
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
      this.placingMessage(message);
      this.requesting(ctx);
    } else {
      return ctx.reply('Please input your details');
    }
  }

  async resetRequest() {
    REQUEST_TIKET.ticket_id = '';
    REQUEST_TIKET.ticket_name = '';
    REQUEST_TIKET.in_number = '';
    REQUEST_TIKET.speedy_number = '';
    REQUEST_TIKET.customer_number = '';
    REQUEST_TIKET.reason = '';
    REQUEST_TIKET.description = '';
  }

  async placingMessage(message: string) {
    if (!REQUEST_TIKET.ticket_name) {
      const res = await this.getTeknisiJobName(message);
      const { data } = res;
      REQUEST_TIKET.ticket_id = data.id
      REQUEST_TIKET.ticket_name = data.name
    } else if (!REQUEST_TIKET.in_number) {
      REQUEST_TIKET.in_number = message;
    } else if (!REQUEST_TIKET.speedy_number) {
      REQUEST_TIKET.speedy_number = message;
    } else if (!REQUEST_TIKET.customer_number) {
      REQUEST_TIKET.customer_number = message;
    } else if (!REQUEST_TIKET.reason) {
      REQUEST_TIKET.reason = message;
    } else if (!REQUEST_TIKET.description) {
      REQUEST_TIKET.description = message
    }
  }

  async requesting(ctx: Context) {
    if (REQUEST_TIKET.ticket_name === '') {
      const teknisi_job = await this.getTeknisiJob();
      ctx.reply('Silahkan Pilih', {
        parse_mode: "Markdown",
        ...Markup.keyboard([
          ...teknisi_job.data.map((i) => { return Markup.button.callback(i.name, i.name) })
        ]),
      })
    } else if (REQUEST_TIKET.in_number === '') {
      ctx.reply(`Anda Memilih tiket <b>${REQUEST_TIKET.ticket_name}</b> \nsilahkan masukan IN (exp: INxxx0)`, { parse_mode: "HTML" })
    } else if (REQUEST_TIKET.speedy_number === '') {
      ctx.reply('Masukan no speedy')
    } else if (REQUEST_TIKET.customer_number === '') {
      ctx.reply('Masukan cp pelanggan');
    } else if (!REQUEST_TIKET.reason) {
      ctx.reply('Masukan penyebab')
    } else if (!REQUEST_TIKET.description) {
      ctx.reply('Masukan keterangan perbaikan')
    } else {
      const requestId = uuid();
      REQUEST_TIKET.request_id = requestId;
      ctx.reply(`Summary \n\n
        ID Order : ${requestId} \n
        No IN: ${REQUEST_TIKET.in_number} \n\n
        No Speedy: ${REQUEST_TIKET.speedy_number} \n
        Cp Pelanggan: ${REQUEST_TIKET.customer_number} \n
        Penyebab : ${REQUEST_TIKET.reason} \n
        Perbaikan : ${REQUEST_TIKET.description} \n\n
        Jika sudah benar klik submit
      `, {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          Markup.button.callback('Submit', 'submit'),
          Markup.button.callback('Cancel', 'cancel')
        ]),
      })
    }
  }

  @Action('submit')
  async submit(ctx: Context) {
    const valid = validationRequestTicket();
    if (!valid) {
      ctx.reply('Time out please use /start to start requesting again');
    } else {
      ctx.reply('request submit to sistem')
    }
  }

  @Action('cancel')
  async cancle(ctx: Context) {
    const valid = validationRequestTicket();
    if (!valid) {
      ctx.reply('Time out please use /start to start requesting again');
    } else {
      this.resetRequest();
      ctx.reply('cancel submit')
    }
  }

  async getTeknisiJob() {
    try {
      const teknisi_job = await this.prisma.teknisi_job.findMany();
      return {
        data: teknisi_job
      }
    } catch (e) {
      throw e;
    }
  }

  async getTeknisiJobName(name: string) {
    try {
      const result = await this.prisma.teknisi_job.findUnique({
        where: {
          name: name
        }
      })

      if (name) {
        return {
          data: result
        }
      }

    } catch (e) {
      throw e;
    }
  }
}
