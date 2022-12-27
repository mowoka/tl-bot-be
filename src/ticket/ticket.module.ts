import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { JwtStrategy } from 'src/auth/strategy';
import { TeknisiJobService } from 'src/teknisi-job/teknisi-job.service';
import { LaporLangsungService } from 'src/lapor-langsung/lapor-langsung.service';
import { TutupOdpService } from 'src/tutup-odp/tutup-odp.service';
import { TiketRegulerService } from 'src/tiket-reguler/tiket-reguler.service';
import { TiketRedundantService } from 'src/tiket-redundant/tiket-redundant.service';
import { ValinsService } from 'src/valins/valins.service';
import { UnspectService } from 'src/unspect/unspect.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_TOKEN,
    }),
  ],
  providers: [TicketService, JwtStrategy, TeknisiJobService, LaporLangsungService, TiketRegulerService, TiketRedundantService, TutupOdpService, ValinsService, UnspectService],
  controllers: [TicketController]
})
export class TicketModule { }
