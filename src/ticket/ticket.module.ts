import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { JwtStrategy } from 'src/auth/strategy';
import { TeknisiJobService } from 'src/teknisi-job/teknisi-job.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_TOKEN,
    }),
  ],
  providers: [TicketService, JwtStrategy, TeknisiJobService],
  controllers: [TicketController]
})
export class TicketModule { }
