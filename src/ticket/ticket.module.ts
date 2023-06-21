import { Module, forwardRef } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { JwtStrategy } from 'src/auth/strategy';
import { TeknisiJobService } from 'src/teknisi-job/teknisi-job.service';
import { LaporLangsungService } from 'src/lapor-langsung/lapor-langsung.service';
import { TutupOdpService } from 'src/tutup-odp/tutup-odp.service';
import { TiketRegulerService } from 'src/tiket-reguler/tiket-reguler.service';
import { TiketRedundantService } from 'src/tiket-redundant/tiket-redundant.service';
import { ValinsService } from 'src/valins/valins.service';
import { UnspectService } from 'src/unspect/unspect.service';
import { PromanService } from 'src/proman/proman.service';
import { SqmService } from 'src/sqm/sqm.service';
import { TeknisiUserService } from 'src/teknisi-user/teknisi-user.service';
import { TeknisiUserModule } from 'src/teknisi-user/teknisi-user.module';
import { TiketBantekService } from '@tiket-bantek/tiket-bantek.service';
import { KendalaSqmService } from '@kendala-sqm/kendala-sqm.service';
import { TiketInfraService } from '@tiket-infra/tiket-infra.service';
import { TiketUsService } from '@tiket-us/tiket-us.service';
import { TiketGaulRegulerService } from '@tiket-gaul-reguler/tiket-gaul-reguler.service';
import { TiketGaulSqmService } from '@tiket-gaul-sqm/tiket-gaul-sqm.service';
import { TiketGaulUsService } from '@tiket-gaul-us/tiket-gaul-us.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_TOKEN,

    }),
    forwardRef(() => TeknisiUserModule),
  ],
  providers: [
    TicketService,
    JwtStrategy,
    TeknisiJobService,
    LaporLangsungService,
    TiketRegulerService,
    TiketRedundantService,
    TutupOdpService,
    ValinsService,
    UnspectService,
    PromanService,
    SqmService,
    KendalaSqmService,
    TiketInfraService,
    TiketUsService,
    TiketBantekService,
    TeknisiUserService,
    TiketGaulRegulerService,
    TiketGaulSqmService,
    TiketGaulUsService
  ],
})
export class TicketModule { }
