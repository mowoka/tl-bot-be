import { Module } from '@nestjs/common';
import { TeknisiUserController } from './teknisi-user.controller';
import { TeknisiUserService } from './teknisi-user.service';
import { JwtStrategy } from 'src/auth/strategy';
import { LaporLangsungService } from 'src/lapor-langsung/lapor-langsung.service';
import { TutupOdpService } from 'src/tutup-odp/tutup-odp.service';
import { TiketRegulerService } from 'src/tiket-reguler/tiket-reguler.service';
import { SqmService } from 'src/sqm/sqm.service';
import { PromanService } from 'src/proman/proman.service';
import { UnspectService } from 'src/unspect/unspect.service';
import { ValinsService } from 'src/valins/valins.service';
import { TiketTeamLeadService } from 'src/tiket-team-lead/tiket-team-lead.service';
import { TiketGaulRegulerService } from '@tiket-gaul-reguler/tiket-gaul-reguler.service';
import { TiketGaulSqmService } from '@tiket-gaul-sqm/tiket-gaul-sqm.service';
import { TiketGaulUsService } from '@tiket-gaul-us/tiket-gaul-us.service';

@Module({
  controllers: [TeknisiUserController],
  providers: [
    TeknisiUserService,
    JwtStrategy,
    LaporLangsungService,
    TutupOdpService,
    TiketRegulerService,
    SqmService,
    PromanService,
    UnspectService,
    ValinsService,
    TiketTeamLeadService,
    TiketGaulRegulerService,
    TiketGaulSqmService,
    TiketGaulUsService
  ],
  exports: [TiketTeamLeadService]
})
export class TeknisiUserModule { }
