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
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
