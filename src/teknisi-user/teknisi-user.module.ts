import { Module } from '@nestjs/common';
import { TeknisiUserController } from './teknisi-user.controller';
import { TeknisiUserService } from './teknisi-user.service';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [TeknisiUserController],
  providers: [TeknisiUserService, JwtStrategy]
})
export class TeknisiUserModule { }
