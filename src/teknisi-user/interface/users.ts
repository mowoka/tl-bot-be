import { LaporLangsung } from "./lapor.langsung";
import { Proman } from "./proman";
import { SQM } from "./sqm";
import { TiketRedundant } from "./tiket.redundant";
import { TiketReguler } from "./tiket.reguler";
import { TiketTeamLead } from "./tiket.team.lead";
import { TutupOdp } from "./tutup.odp";
import { Unspect } from "./unspect";
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
    lapor_langsung: LaporLangsung[];
    tutup_odp: TutupOdp[];
    ticket_regular: TiketReguler[];
    ticket_sqm: SQM[];
    proman: Proman[];
    unspect: Unspect[];
    valins: Valins[];
    ticket_redundant: TiketRedundant[];
    ticket_team_lead: TiketTeamLead[];
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
    lapor_langsung: KpiUser;
    tutup_odp: KpiUser;
    ticket_regular: KpiUser;
    ticket_sqm: KpiUser;
    proman: KpiUser;
    unspect: KpiUser;
    valins: KpiUser;
    ticket_redundant: KpiUser;
    gamas_type_a: KpiUser;
    gamas_type_b: KpiUser;
    gamas_type_c: KpiUser;
    survey: KpiUser;
    kpi: number;
}