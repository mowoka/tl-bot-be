import { Bantek, Infra, KendalaSQM, LaporLangsung, Proman, SQM, TiketReguler, TiketTeamLead, TutupOdp, US, Unspect, User, UserResult, Valins } from "../interface";

export const count_kpi = (user: User): UserResult => {

    const kpi_lapor_langsung = countLaporLangsung(user.ticket_lapor_langsung);
    const kpi_tutup_odp = countTutupOdp(user.ticket_tutup_odp);
    const kpi_tiket_reguler = countTiketReguler(user.ticket_regular);
    const kpi_sqm = countSqm(user.ticket_sqm);
    const kpi_proman = countProman(user.ticket_proman);
    const kpi_unspect = countUnspect(user.ticket_unspect);
    const kpi_valins = countValins(user.ticket_valins);
    const kpi_kendala_sqm = countKendalaSqm(user.ticket_kendala_sqm);
    const kpi_bantek = countBantek(user.ticket_bantek);
    const kpi_infra = countInfra(user.ticket_infra);
    const kpi_us = countUS(user.ticket_us);
    const kpi_gaul_reguler = countGaulReguler(user.ticket_gaul_reguler);
    const kpi_gaul_sqm = countGaulSqm(user.ticket_gaul_sqm);
    const kpi_gaul_us = countGaulUS(user.ticket_gaul_us);

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
    const kpi =
        (
            kpi_lapor_langsung +
            kpi_tutup_odp +
            kpi_tiket_reguler +
            kpi_sqm +
            kpi_proman +
            kpi_unspect +
            kpi_valins +
            kpi_gamas_type_a +
            kpi_gamas_type_b +
            kpi_gamas_type_c +
            kpi_kendala_sqm +
            kpi_bantek +
            kpi_infra +
            kpi_us +
            kpi_survey
        ) - (
            kpi_gaul_reguler +
            kpi_gaul_sqm +
            kpi_gaul_us
        )

    return {
        ...user,
        ticket_lapor_langsung: { name: 'lapor_langsung', score: kpi_lapor_langsung },
        ticket_tutup_odp: { name: 'tutup_odp', score: kpi_tutup_odp },
        ticket_regular: { name: 'tiket_reguler', score: kpi_tiket_reguler },
        ticket_sqm: { name: 'ticket_sqm', score: kpi_sqm },
        ticket_proman: { name: 'proman', score: kpi_proman },
        ticket_unspect: { name: 'unspect', score: kpi_unspect },
        ticket_valins: { name: 'valins', score: kpi_valins },
        ticket_kendala_sqm: { name: 'kendala_sqm', score: kpi_kendala_sqm },
        ticket_bantek: { name: 'bantek', score: kpi_bantek },
        ticket_infra: { name: 'infra', score: kpi_infra },
        ticket_us: { name: 'us', score: kpi_us },
        ticket_gaul_reguler: { name: 'gaul_reguler', score: kpi_gaul_reguler },
        ticket_gaul_sqm: { name: 'gaul_sqm', score: kpi_gaul_sqm },
        ticket_gaul_us: { name: 'gaul_us', score: kpi_gaul_us },
        gamas_type_a: { name: 'gamas_type_a', score: kpi_gamas_type_a },
        gamas_type_b: { name: 'gamas_type_b', score: kpi_gamas_type_b },
        gamas_type_c: { name: 'gamas_type_c', score: kpi_gamas_type_c },
        survey: { name: 'survey', score: kpi_survey },
        kpi: kpi / 18,
    }
}


function countTiketTeamLead(data: TiketTeamLead[]): number {
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
function countKendalaSqm(data: KendalaSQM[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point;
    });
    return result;
}
function countBantek(data: Bantek[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point;
    });
    return result;
}
function countInfra(data: Infra[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point;
    });
    return result;
}
function countUS(data: US[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point;
    });
    return result;
}
function countGaulReguler(data: TiketReguler[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point;
    });
    return result;
}
function countGaulSqm(data: SQM[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point;
    });
    return result;
}
function countGaulUS(data: US[]): number {
    let result = 0;
    data.map((item) => {
        result += item.job.point;
    });
    return result;
}
