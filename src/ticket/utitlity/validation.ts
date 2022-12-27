import { Context, Markup } from 'telegraf';
import { REQUEST_TICKET_DATA, TICKET_LAPOR_LANGUSNG_DATA, TICKET_PROMAN_DATA, TICKET_REGULER_DATA, TICKET_SQM_DATA, TICKET_TUTUP_ODP_DATA, TICKET_UNSPECT_DATA, TICKET_VALINS_DATA } from './reference';



export const checkValidTicketData = (job_name: string): boolean => {
    let valid: boolean;
    switch (job_name) {
        case 'Tiket Reguler':
            valid = checkTicketReguler();
            break
        case 'Lapor Langsung':
            valid = checkLaporLangsung();
            break
        case 'Tutup ODP':
            valid = checkTutupODP();
            break;
        case 'Valins':
            valid = checkValins();
            break;
        case 'Unspect':
            valid = checkUnspect();
            break;
        case 'Proman':
            valid = checkProman();
            break;
        default:
            valid = checkSQM();
            break;
    }
    return valid;
}


function checkTicketReguler(): boolean {
    const { insiden_number, speedy_number, customer_name, customer_phone, problem, description } = TICKET_REGULER_DATA
    if (!insiden_number || !speedy_number || !customer_name || !customer_phone || !problem || !description) {
        return false
    }
    return true
}

function checkLaporLangsung(): boolean {
    const { speedy_number, customer_name, customer_phone, problem, description } = TICKET_LAPOR_LANGUSNG_DATA;
    if (!speedy_number || !customer_name || !customer_phone || !problem || !description) {
        return false;
    }
    return true;
}

function checkTutupODP(): boolean {
    const { odp_address, odp_name } = TICKET_TUTUP_ODP_DATA;
    if (!odp_address || !odp_name) return false
    return true
}

function checkValins(): boolean {
    const { valins_id, odp } = TICKET_VALINS_DATA;
    if (!valins_id || !odp) return false;
    return true
}

function checkUnspect(): boolean {
    const { speedy_number, odp, problem, description } = TICKET_UNSPECT_DATA
    if (!speedy_number || !odp || !problem || !description) return false
    return true
}

function checkProman(): boolean {
    const { odp_name, distribusi, capacity_port, status_port_use, status_port_available, odp_cradle, opm_lenght } = TICKET_PROMAN_DATA;
    if (!odp_name || !distribusi || !capacity_port || !status_port_use || !status_port_available || !odp_cradle || !opm_lenght) return false;
    return true;
}


function checkSQM(): boolean {
    const { insiden_number, speedy_number, customer_name, problem, description } = TICKET_SQM_DATA;
    if (!insiden_number || !speedy_number || !customer_name || !problem || !description) return false
    return true;
}

export const validatorTicketData = async (job_name: string, ctx: Context) => {
    switch (job_name) {
        case 'Tiket Reguler':
            await TicketRegulerValidator(job_name, ctx);
            break;
        case 'Lapor Langsung':
            await LaporLansgunValidator(job_name, ctx);
            break;
        case 'Tutup ODP':
            await TutupODPValidator(job_name, ctx);
            break;
        case 'Valins':
            await ValinsValidator(job_name, ctx);
            break;
        case 'Unspect':
            await UnspectValidator(job_name, ctx);
            break;
        case 'Proman':
            await PromanValidator(job_name, ctx);
            break;
        default:
            await SQMValidator(job_name, ctx);
            break;
    }
}

async function TicketRegulerValidator(job_name: string, ctx: Context) {
    const { insiden_number, speedy_number, customer_name, customer_phone, problem, description } = TICKET_REGULER_DATA;
    if (!insiden_number) {
        await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan IN (exp: INxxxx01)`, {
            parse_mode: 'HTML',
        })
    } else if (!speedy_number) {
        await ctx.reply(`Masukan speedy number`, {
            parse_mode: 'HTML',
        })
    } else if (!customer_name) {
        await ctx.reply(`Masukan nama pelanggan`, {
            parse_mode: 'HTML',
        })
    } else if (!customer_phone) {
        await ctx.reply(`Masukan nomor cp pelanggan`, {
            parse_mode: 'HTML',
        })
    } else if (!problem) {
        await ctx.reply(`Masukan penyebab`, {
            parse_mode: 'HTML',
        })
    } else if (!description) {
        await ctx.reply(`Masukan keterangan perbaikan`, {
            parse_mode: 'HTML',
        })
    } else {
        REQUEST_TICKET_DATA.data = TICKET_REGULER_DATA;
        await ctx.reply(`Summary ${job_name} \n\nNo IN: ${insiden_number} \n\nNo Speedy: ${speedy_number} \nnama pelanggan: ${customer_name} \nNo pelanggan: ${customer_phone} \npenyebab: ${problem} \nperbaikan: ${description} \n\n jika benar klik submit`, {
            parse_mode: "HTML",
            ...Markup.inlineKeyboard([
                Markup.button.callback('Submit', 'submit'),
                Markup.button.callback('Cancel', 'cancel')
            ])
        })
    }
}

async function LaporLansgunValidator(job_name: string, ctx: Context) {
    const { speedy_number, customer_phone, customer_name, problem, description } = TICKET_LAPOR_LANGUSNG_DATA;
    if (!speedy_number) {
        await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Speedy Number`, {
            parse_mode: 'HTML',
        })
    } else if (!customer_phone) {
        await ctx.reply(`Masukan nomor cp pelanggan`, {
            parse_mode: 'HTML',
        })
    } else if (!customer_name) {
        await ctx.reply(`Masukan nama pelanggan`, {
            parse_mode: 'HTML',
        })
    } else if (!problem) {
        await ctx.reply(`Masukan penyebab`, {
            parse_mode: 'HTML',
        })
    } else if (!description) {
        await ctx.reply(`Masukan keterangan perbaikan`, {
            parse_mode: 'HTML',
        })
    } else {
        REQUEST_TICKET_DATA.data = TICKET_LAPOR_LANGUSNG_DATA
        await ctx.reply(`Summary ${job_name} \n\nNo Speedy: ${speedy_number} \nnama pelanggan: ${customer_name} \nNo pelanggan: ${customer_phone} \npenyebab: ${problem} \nperbaikan: ${description} \n\n jika benar klik submit`, {
            parse_mode: "HTML",
            ...Markup.inlineKeyboard([
                Markup.button.callback('Submit', 'submit'),
                Markup.button.callback('Cancel', 'cancel'),
            ])
        })
    }
}

async function TutupODPValidator(job_name: string, ctx: Context) {
    const { odp_name, odp_address } = TICKET_TUTUP_ODP_DATA;
    if (!odp_name) {
        await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan nama ODP`, {
            parse_mode: 'HTML',
        })
    } else if (odp_address) {
        await ctx.reply(`Masukan Alamat ODP`, {
            parse_mode: 'HTML',
        })
    } else {
        REQUEST_TICKET_DATA.data = TICKET_TUTUP_ODP_DATA;
        await ctx.reply(`Summary ${job_name} \n\nNama odp: ${odp_name} \nAlamat odp: ${odp_address} \n\n jika benar klik submit`, {
            parse_mode: "HTML",
            ...Markup.inlineKeyboard([
                Markup.button.callback('Submit', 'submit'),
                Markup.button.callback('Cancel', 'cancel'),
            ])
        })
    }
}

async function ValinsValidator(job_name: string, ctx: Context) {
    const { valins_id, odp } = TICKET_VALINS_DATA;

    if (!valins_id) {
        await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Valins ID`, {
            parse_mode: 'HTML',
        })
    } else if (!odp) {
        await ctx.reply(`Masukan odp`, {
            parse_mode: 'HTML',
        })
    } else {
        REQUEST_TICKET_DATA.data = TICKET_VALINS_DATA
        await ctx.reply(`Summary ${job_name} \n\nID valins: ${valins_id} \nOdp: ${odp} \n\n jika benar klik submit`, {
            parse_mode: "HTML",
            ...Markup.inlineKeyboard([
                Markup.button.callback('Submit', 'submit'),
                Markup.button.callback('Cancel', 'cancel'),
            ])
        })
    }
}

async function UnspectValidator(job_name: string, ctx: Context) {
    const { speedy_number, odp, problem, description } = TICKET_UNSPECT_DATA;
    if (!speedy_number) {
        await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Speedy Number`, {
            parse_mode: 'HTML',
        })
    } else if (!odp) {
        await ctx.reply(`Masukan odp`, {
            parse_mode: 'HTML',
        })
    } else if (!problem) {
        await ctx.reply(`Masukan penyebab`, {
            parse_mode: 'HTML',
        })
    } else if (!description) {
        await ctx.reply(`Masukan keterangan perbaikan`, {
            parse_mode: 'HTML',
        })
    } else {
        REQUEST_TICKET_DATA.data = TICKET_UNSPECT_DATA;
        await ctx.reply(`Summary ${job_name} \n\nNo Speedy: ${speedy_number} \nodp: ${odp} \npenyebab: ${problem} \nperbaikan: ${description} \n\n jika benar klik submit`, {
            parse_mode: "HTML",
            ...Markup.inlineKeyboard([
                Markup.button.callback('Submit', 'submit'),
                Markup.button.callback('Cancel', 'cancel'),
            ])
        })
    }
}


async function PromanValidator(job_name: string, ctx: Context) {
    const { odp_name, distribusi, capacity_port, status_port_use, status_port_available, odp_cradle, opm_lenght } = TICKET_PROMAN_DATA
    if (!odp_name) {
        await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan nama ODP`, {
            parse_mode: 'HTML',
        })
    } else if (!distribusi) {
        await ctx.reply(`Masukan distribusi`, {
            parse_mode: 'HTML',
        })
    } else if (!capacity_port) {
        await ctx.reply(`Masukan capacity port`, {
            parse_mode: 'HTML',
        })
    } else if (!status_port_use) {
        await ctx.reply(`Masukan port yang digunakan`, {
            parse_mode: 'HTML',
        })
    } else if (!status_port_available) {
        await ctx.reply(`Masukan port kosong`, {
            parse_mode: 'HTML',
        })
    } else if (!odp_cradle) {
        await ctx.reply(`Masukan odp gendong`, {
            parse_mode: 'HTML',
        })
    } else if (!opm_lenght) {
        await ctx.reply(`Masukan panjang opm`, {
            parse_mode: 'HTML',
        })
    } else {
        REQUEST_TICKET_DATA.data = TICKET_PROMAN_DATA;
        await ctx.reply(`Summary ${job_name} \n\nNama odp: ${odp_name} \nDistribusi: ${distribusi} \nCapacity port: ${capacity_port} \nStatus port yang digunakan: ${status_port_use} \nStatus port kosong: ${status_port_available} \nOdp gendong: ${odp_cradle} \nPanajang opm: ${opm_lenght} \n\n jika benar klik submit`, {
            parse_mode: "HTML",
            ...Markup.inlineKeyboard([
                Markup.button.callback('Submit', 'submit'),
                Markup.button.callback('Cancel', 'cancel'),
            ])
        })
    }
}


async function SQMValidator(job_name: string, ctx: Context) {
    const { insiden_number, speedy_number, customer_name, problem, description } = TICKET_SQM_DATA
    if (!insiden_number) {
        await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan IN (exp: INxxxx01)`, {
            parse_mode: 'HTML',
        })
    } else if (speedy_number) {
        await ctx.reply(`Masukan speedy number`, {
            parse_mode: 'HTML',
        })
    } else if (!customer_name) {
        await ctx.reply(`Masukan nama pelanggan`, {
            parse_mode: 'HTML',
        })
    } else if (!problem) {
        await ctx.reply(`Masukan penyebab`, {
            parse_mode: 'HTML',
        })
    } else if (!description) {
        await ctx.reply(`Masukan keterangan perbaikan`, {
            parse_mode: 'HTML',
        })
    } else {
        REQUEST_TICKET_DATA.data = TICKET_SQM_DATA;
        await ctx.reply(`Summary ${job_name} \n\nNo IN: ${insiden_number} \n\nNo Speedy: ${speedy_number} \nnama pelanggan: ${customer_name} \npenyebab: ${problem} \nperbaikan: ${description} \n\n jika benar klik submit`, {
            parse_mode: "HTML",
            ...Markup.inlineKeyboard([
                Markup.button.callback('Submit', 'submit'),
                Markup.button.callback('Cancel', 'cancel')
            ])
        })
    }
}