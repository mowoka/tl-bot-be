import { Bantek } from "./bantek";
import { Infra } from "./infra";
import { KendalaSQM } from "./kendala.sqm";
import { LaporLangsung } from "./lapor.langsung";
import { Proman } from "./proman";
import { SQM } from "./sqm";
import { TiketReguler } from "./tiket.reguler";
import { TiketTeamLead } from "./tiket.team.lead";
import { TutupOdp } from "./tutup.odp";
import { Unspect } from "./unspect";
import { US } from "./us";
import { Valins } from "./valins";

export interface User {
    id: number,
    createAt: Date;
    updateAt: Date;
    nik: string;
    name: string
    idTelegram: string
    partner_id: number
    sector_id: number,
    witel_id: number,
    regional_id: number,
    ticket_lapor_langsung: LaporLangsung[];
    ticket_tutup_odp: TutupOdp[];
    ticket_regular: TiketReguler[];
    ticket_sqm: SQM[];
    ticket_proman: Proman[];
    ticket_unspect: Unspect[];
    ticket_valins: Valins[];
    ticket_kendala_sqm: KendalaSQM[];
    ticket_bantek: Bantek[];
    ticket_infra: Infra[];
    ticket_us: US[];
    ticket_team_lead: TiketTeamLead[];
    ticket_gaul_reguler: TiketReguler[];
    ticket_gaul_sqm: SQM[];
    ticket_gaul_us: US[];
}

export interface KpiUser {
    name: string,
    score: number,
}

export interface UserResult {
    id: number,
    createAt: Date;
    updateAt: Date;
    nik: string;
    name: string;
    idTelegram: string;
    partner_id: number;
    sector_id: number;
    witel_id: number;
    regional_id: number;
    ticket_lapor_langsung: KpiUser;
    ticket_tutup_odp: KpiUser;
    ticket_regular: KpiUser;
    ticket_sqm: KpiUser;
    ticket_proman: KpiUser;
    ticket_unspect: KpiUser;
    ticket_valins: KpiUser;
    ticket_kendala_sqm: KpiUser;
    ticket_bantek: KpiUser;
    ticket_infra: KpiUser;
    ticket_us: KpiUser;
    ticket_gaul_reguler: KpiUser;
    ticket_gaul_sqm: KpiUser;
    ticket_gaul_us: KpiUser;
    gamas_type_a: KpiUser;
    gamas_type_b: KpiUser;
    gamas_type_c: KpiUser;
    survey: KpiUser;
    kpi: number;
}