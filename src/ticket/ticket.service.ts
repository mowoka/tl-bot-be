import { Injectable } from '@nestjs/common';
import { Action, Command, Hears, On, Start, Update, } from 'nestjs-telegraf';
import { Context, Markup, } from 'telegraf';

@Update()
@Injectable()
export class TicketService {
  constructor(){}
    
  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome gio');
  }

  @Command('help')
  async helpCommand(ctx: Context) {
    await ctx.reply('you want help, pelase use /start');
  }

  @Command('button')
  async buttonComand(ctx: Context){
    await  ctx.reply('<b>Coke</b> or <i>Pepsi ?</i>',{
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        Markup.button.callback('Coke', 'coke'),
        Markup.button.callback('Pepsi', 'pepsi'),
      ])
    })
  }

  @Action('Coke')
  async cokeActions(ctx:Context, next){
    return ctx.reply('👍').then(() => next())
  }

  @Action('Pepsi')
  async pepsiActions(ctx:Context, next){
    return ctx.reply('👍').then(() => next())
  }

  @Command('onetime')
  async onetimeCommand(ctx: Context){
    await ctx.reply('One time keyboard', Markup
    .keyboard(['/simple', '/inline', '/pyramid'])
    .oneTime()
    .resize()
    )
  }

  @Command('custom')
  async customCommand(ctx: Context){
    await ctx.reply('Custom buttons keyboard', Markup
      .keyboard([
        ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
        ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
        ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
      ])
      .oneTime()
      .resize()
    )
  }

  @Command('special')
  async specialCommand(ctx: Context){
    await ctx.reply(
      'Special buttons keyboard',
      Markup.keyboard([
        Markup.button.contactRequest('Send contact'),
        Markup.button.locationRequest('Send location')
      ]).resize()
    )
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears(['hi', 'Hi', 'HI'])
  async hearsHi(ctx: Context) {
    await ctx.reply('Hey there');
  }

  @Hears('whoami')
  async whoami(ctx: Context) {
    await ctx.reply(`siapa saya : ${ctx.me}`);
  }
}
