import { LaporLangsung, Proman, SQM, TiketRedundant, TiketReguler, TiketTeamLead, TutupOdp, Unspect, User, UserResult, Valins } from "../type";

export const count_kpi = (user: User): UserResult => {

    const kpi_lapor_langsung = countLaporLangsung(user.lapor_langsung);
    const kpi_tutup_odp = countTutupOdp(user.tutup_odp);
    const kpi_tiket_reguler = countTiketReguler(user.ticket_regular);
    const kpi_sqm = countSqm(user.ticket_sqm);
    const kpi_proman = countProman(user.proman);
    const kpi_unspect = countUnspect(user.unspect);
    const kpi_valins = countValins(user.valins);
    const kpi_tiket_redundant = countTiketRedundant(user.ticket_redundant);

    // logic for count kpi team lead tiket
    const gamas_type_a = user.ticket_team_lead.filter(i => i.team_lead_job_id === 1);
    const gamas_type_b = user.ticket_team_lead.filter(i => i.team_lead_job_id === 2);
    const gamas_type_c = user.ticket_team_lead.filter(i => i.team_lead_job_id === 3);
    const survey = user.ticket_team_lead.filter(i => i.team_lead_job_id === 4);

    // count kpi for team lead tiket
    const kpi_gamas_type_a = countTiketTeamLead(gamas_type_a);
    const kpi_gamas_type_b = countTiketTeamLead(gamas_type_b);
    const kpi_gamas_type_c = countTiketTeamLead(gamas_type_c);
    const kpi_survey = countTiketTeamLead(survey);

    delete user.ticket_team_lead;

    // caount total kpi
    const kpi = (kpi_lapor_langsung + kpi_tutup_odp + kpi_tiket_reguler + kpi_sqm + kpi_proman + kpi_unspect + kpi_valins + kpi_gamas_type_a + kpi_gamas_type_b + kpi_gamas_type_c + kpi_survey) - kpi_tiket_redundant

    return {
        ...user,
        lapor_langsung: { name: 'lapor_langsung', score: kpi_lapor_langsung },
        tutup_odp: { name: 'tutup_odp', score: kpi_tutup_odp },
        ticket_regular: { name: 'lapor_langsung', score: kpi_tiket_reguler },
        ticket_sqm: { name: 'ticket_sqm', score: kpi_sqm },
        proman: { name: 'proman', score: kpi_proman },
        unspect: { name: 'unspect', score: kpi_unspect },
        valins: { name: 'valins', score: kpi_valins },
        ticket_redundant: { name: 'ticket_redundant', score: kpi_tiket_redundant },
        gamas_type_a: { name: 'gamas_type_a', score: kpi_gamas_type_a },
        gamas_type_b: { name: 'gamas_type_b', score: kpi_gamas_type_b },
        gamas_type_c: { name: 'gamas_type_c', score: kpi_gamas_type_c },
        survey: { name: 'survey', score: kpi_survey },
        kpi: kpi / 12,
    }
}


function countTiketTeamLead(data: TiketTeamLead[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}

function countTiketRedundant(data: TiketRedundant[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}
function countValins(data: Valins[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}
function countLaporLangsung(data: LaporLangsung[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}
function countTutupOdp(data: TutupOdp[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}
function countTiketReguler(data: TiketReguler[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}
function countSqm(data: SQM[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}
function countProman(data: Proman[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}
function countUnspect(data: Unspect[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point
    });
    return result;
}