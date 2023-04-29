import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TeknisiJobModule } from './teknisi-job/teknisi-job.module';
import { TicketModule } from './ticket/ticket.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { TeamLeaderJobModule } from './team-leader-job/team-leader-job.module';
import { TeknisiUserModule } from './teknisi-user/teknisi-user.module';
import { LaporLangsungModule } from './lapor-langsung/lapor-langsung.module';
import { TiketRegulerModule } from './tiket-reguler/tiket-reguler.module';
import { TiketRedundantModule } from './tiket-redundant/tiket-redundant.module';
import { TutupOdpModule } from './tutup-odp/tutup-odp.module';
import { ValinsModule } from './valins/valins.module';
import { UnspectModule } from './unspect/unspect.module';
import { PromanModule } from './proman/proman.module';
import { SqmModule } from './sqm/sqm.module';
import { TiketTeamLeadModule } from './tiket-team-lead/tiket-team-lead.module';
import { SectorModule } from './sector/sector.module';
import { CoreModule } from './core/core.module';
import { WitelModule } from './witel/witel.module';
import { PartnerModule } from './partner/partner.module';
import { RegionalModule } from './regional/regional.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    TeknisiJobModule,
    TicketModule,
    TeamLeaderJobModule,
    TeknisiUserModule,
    LaporLangsungModule,
    TiketRegulerModule,
    TiketRedundantModule,
    TutupOdpModule,
    ValinsModule,
    UnspectModule,
    PromanModule,
    SqmModule,
    TiketTeamLeadModule,
    SectorModule,
    CoreModule,
    WitelModule,
    PartnerModule,
    RegionalModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
