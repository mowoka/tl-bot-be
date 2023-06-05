import { Context } from 'telegraf';
import { TICKET_BANTEK, TICKET_INFRA, TICKET_LAPOR_LANGUSNG_DATA, TICKET_PROMAN_DATA, TICKET_REGULER_DATA, TICKET_SQM_DATA, TICKET_TUTUP_ODP_DATA, TICKET_UNSPECT_DATA, TICKET_VALINS_DATA, TIKET_KENDALA_SQM } from './reference';

export const setRequestTicketData = async (job_name: string, ctx: Context) => {
    switch (job_name) {
        case 'Tiket Reguler':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan IN (exp: INxxxx01)`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Lapor Langsung':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Speedy Number`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Tutup ODP':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan nama ODP`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Valins':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Valins ID`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Unspect':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Speedy Number`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Proman':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan nama ODP`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Tiket SQM':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan IN (exp: INxxxx01)`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Tiket Kendala SQM':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan IN (exp: INxxxx01)`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Tiket Infra':
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan IN (exp: INxxxx01)`, {
                parse_mode: 'HTML',
            })
            break;
        // defaul will be tiket bantek
        default:
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan tiket number`, {
                parse_mode: 'HTML',
            })
            break;
    }
}

export const placingMessageTicketData = (job_name: string, message: string) => {
    switch (job_name) {
        case 'Tiket Reguler':
            if (!TICKET_REGULER_DATA.insiden_number) {
                TICKET_REGULER_DATA.insiden_number = message;
            } else if (!TICKET_REGULER_DATA.speedy_number) {
                TICKET_REGULER_DATA.speedy_number = message;
            } else if (!TICKET_REGULER_DATA.customer_name) {
                TICKET_REGULER_DATA.customer_name = message;
            } else if (!TICKET_REGULER_DATA.customer_phone) {
                TICKET_REGULER_DATA.customer_phone = message;
            } else if (!TICKET_REGULER_DATA.problem) {
                TICKET_REGULER_DATA.problem = message;
            } else {
                TICKET_REGULER_DATA.description = message;
            }
            break;
        case 'Lapor Langsung':
            if (!TICKET_LAPOR_LANGUSNG_DATA.speedy_number) {
                TICKET_LAPOR_LANGUSNG_DATA.speedy_number = message;
            } else if (!TICKET_LAPOR_LANGUSNG_DATA.customer_phone) {
                TICKET_LAPOR_LANGUSNG_DATA.customer_phone = message;
            } else if (!TICKET_LAPOR_LANGUSNG_DATA.customer_name) {
                TICKET_LAPOR_LANGUSNG_DATA.customer_name = message;
            } else if (!TICKET_LAPOR_LANGUSNG_DATA.problem) {
                TICKET_LAPOR_LANGUSNG_DATA.problem = message
            } else {
                TICKET_LAPOR_LANGUSNG_DATA.description = message;
            }
            break;
        case 'Tutup ODP':
            if (!TICKET_TUTUP_ODP_DATA.odp_name) {
                TICKET_TUTUP_ODP_DATA.odp_name = message;
            } else {
                TICKET_TUTUP_ODP_DATA.odp_address = message;
            }
            break;
        case 'Valins':
            if (!TICKET_VALINS_DATA.valins_id) {
                TICKET_VALINS_DATA.valins_id = message
            } else {
                TICKET_VALINS_DATA.odp = message;
            }
            break;
        case 'Unspect':
            if (!TICKET_UNSPECT_DATA.speedy_number) {
                TICKET_UNSPECT_DATA.speedy_number = message;
            } else if (!TICKET_UNSPECT_DATA.odp) {
                TICKET_UNSPECT_DATA.odp = message
            } else if (!TICKET_UNSPECT_DATA.problem) {
                TICKET_UNSPECT_DATA.problem = message
            } else {
                TICKET_UNSPECT_DATA.description = message;
            }
            break;
        case 'Proman':
            const { odp_name, distribusi, capacity_port, status_port_use, status_port_available, odp_cradle } = TICKET_PROMAN_DATA;

            if (!odp_name) {
                TICKET_PROMAN_DATA.odp_name = message;
            } else if (!distribusi) {
                TICKET_PROMAN_DATA.distribusi = message;
            } else if (!capacity_port) {
                TICKET_PROMAN_DATA.capacity_port = message;
            } else if (!status_port_use) {
                TICKET_PROMAN_DATA.status_port_use = message;
            } else if (!status_port_available) {
                TICKET_PROMAN_DATA.status_port_available = message;
            } else if (!odp_cradle) {
                TICKET_PROMAN_DATA.odp_cradle = message;
            } else {
                TICKET_PROMAN_DATA.opm_length = message;
            }
            break;
        case 'Tiket SQM':
            if (!TICKET_SQM_DATA.insiden_number) {
                TICKET_SQM_DATA.insiden_number = message;
            } else if (!TICKET_SQM_DATA.speedy_number) {
                TICKET_SQM_DATA.speedy_number = message;
            } else if (!TICKET_SQM_DATA.customer_name) {
                TICKET_SQM_DATA.customer_name = message;
            } else if (!TICKET_SQM_DATA.customer_phone) {
                TICKET_SQM_DATA.customer_phone = message;
            } else if (!TICKET_SQM_DATA.problem) {
                TICKET_SQM_DATA.problem = message;
            } else {
                TICKET_SQM_DATA.description = message;
            }
            break;
        case 'Tiket Kendala SQM':
            if (!TIKET_KENDALA_SQM.insiden_number) {
                TIKET_KENDALA_SQM.insiden_number = message;
            } else if (!TIKET_KENDALA_SQM.speedy_number) {
                TIKET_KENDALA_SQM.speedy_number = message;
            } else if (!TIKET_KENDALA_SQM.customer_name) {
                TIKET_KENDALA_SQM.customer_name = message;
            } else if (!TIKET_KENDALA_SQM.customer_number) {
                TIKET_KENDALA_SQM.customer_number = message;
            } else if (!TIKET_KENDALA_SQM.problem) {
                TIKET_KENDALA_SQM.problem = message;
            } else {
                TIKET_KENDALA_SQM.description = message;
            }
            break;
        case 'Tiket Infra':
            if (!TICKET_INFRA.insiden_number) {
                TICKET_INFRA.insiden_number = message;
            } else if (!TICKET_INFRA.description) {
                TICKET_INFRA.description = message;
            } else {
                TICKET_INFRA.date = message;
            }
        // the deaful will be tiket bantek
        default:
            if (!TICKET_BANTEK.ticket_number) {
                TICKET_BANTEK.ticket_number = message;
            } else if (!TICKET_BANTEK.description) {
                TICKET_BANTEK.description = message;
            } else if (!TICKET_BANTEK.date) {
                TICKET_BANTEK.date = message;
            } else {
                TICKET_BANTEK.teknisi_bantek = message;
            }
            break;
    }
}
