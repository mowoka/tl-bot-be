import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TeknisiJobModule } from './teknisi-job/teknisi-job.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    TeknisiJobModule,
    TicketModule,
  ],

})
export class AppModule {}
