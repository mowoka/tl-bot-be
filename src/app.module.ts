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
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
