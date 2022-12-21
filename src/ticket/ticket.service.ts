import { Injectable } from '@nestjs/common';
import { Action, Command, On, Start, Update, } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Markup } from 'telegraf';
import { REQUEST_TIKET, RequestTiketProps, validationRequestTicket } from './utitlity';
import { v4 as uuidv4 } from 'uuid';

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
      await this.placingMessage(message);
      await this.requesting(ctx);
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
    REQUEST_TIKET.request_id = '';
    REQUEST_TIKET.requestor = '';
  }

  async placingMessage(message: string) {
    if (!REQUEST_TIKET.ticket_name) {
      const res = await this.getTeknisiJobName(message);
      const { data } = res;
      REQUEST_TIKET.ticket_id = data.id;
      REQUEST_TIKET.ticket_name = data.name;
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
    if (!REQUEST_TIKET.ticket_name) {
      const teknisi_job = await this.getTeknisiJob();
      ctx.reply('Silahkan Pilih', {
        parse_mode: "Markdown",
        ...Markup.keyboard([
          ...teknisi_job.data.map((i) => { return Markup.button.callback(i.name, i.name) })
        ]),
      })
    } else if (!REQUEST_TIKET.in_number) {
      ctx.reply(`Anda Memilih tiket <b>${REQUEST_TIKET.ticket_name}</b> \nsilahkan masukan IN (exp: INxxx0)`, { parse_mode: "HTML", ...Markup.keyboard([]) })
    } else if (!REQUEST_TIKET.speedy_number) {
      ctx.reply('Masukan no speedy')
    } else if (!REQUEST_TIKET.customer_number) {
      ctx.reply('Masukan cp pelanggan');
    } else if (!REQUEST_TIKET.reason) {
      ctx.reply('Masukan penyebab')
    } else if (!REQUEST_TIKET.description) {
      ctx.reply('Masukan keterangan perbaikan')
    } else {
      const requestId = uuidv4();
      REQUEST_TIKET.request_id = requestId;
      const requestor = {
        role: 'Agent Lapangan',
        nama: ctx.message.from.first_name,
        username: ctx.message.from.username
      }
      REQUEST_TIKET.requestor = JSON.stringify(requestor);

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
      const res = await this.submitTicket(REQUEST_TIKET);
      if (res.statusCode === 200) {
        await this.resetRequest()
        await ctx.reply('success request ticket to sistem', {
          parse_mode: 'Markdown',
          ...Markup.keyboard([
            '/start', '/help'
          ])
        });
      } else {
        ctx.reply('failed request ticket to sistem');
      }
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

  async submitTicket(dto: RequestTiketProps) {
    try {
      const tiket = await this.prisma.ticket.create({
        data: {
          in_number: dto.in_number,
          speedy_number: dto.speedy_number,
          customer_number: dto.customer_number,
          reason: dto.reason,
          description: dto.description,
          teknisi_job_id: dto.ticket_id,
          requestor: dto.requestor.toString()
        }
      })

      if (tiket) {
        return {
          statusCode: 200,
          message: 'Create ticket success',
          status: true,
        }
      }
      return {
        statusCode: 500,
        message: 'Something Error',
        status: false,
      }
    } catch (error) {
      throw error;
    }
  }
}
