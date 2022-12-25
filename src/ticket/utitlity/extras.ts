import { LaporLangsungProps, PromanProps, REQUEST_TICKET_DATA, TicketRegularProps, TicketSQMProps, TutupOdpProps, UnspectProps, ValinsProps } from "./reference"
import { Context } from 'telegraf';

export const setRequestTicketData = async (job_name: string, ctx: Context) => {
    switch (job_name) {
        case 'Tiket Reguler':
            const dataTicketReqgular: TicketRegularProps = {
                insiden_number: '',
                speedy_number: '',
                customer_name: '',
                problem: '',
                description: '',
                teknisi_job_id: '',
                idTelegram: '',
            }
            REQUEST_TICKET_DATA.data = dataTicketReqgular;
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan IN (exp: INxxxx01)`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Lapor Langsung':
            const dataLaporLangsung: LaporLangsungProps = {
                speedy_number: '',
                customer_phone: '',
                customer_name: '',
                problem: '',
                description: '',
                teknisi_job_id: '',
                idTelegram: '',
            }
            REQUEST_TICKET_DATA.data = dataLaporLangsung;
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Speedy Number`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Tutup ODP':
            const dataTutupOdp: TutupOdpProps = {
                odp_name: '',
                odp_address: '',
                teknisi_job_id: '',
                idTelegram: '',
            }
            REQUEST_TICKET_DATA.data = dataTutupOdp;
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan nama ODP`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Valins':
            const dataValins: ValinsProps = {
                valins_id: '',
                odp: '',
                teknisi_job_id: '',
                idTelegram: '',
            }
            REQUEST_TICKET_DATA.data = dataValins;
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Valins ID`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Unspect':
            const dataUnspect: UnspectProps = {
                speedy_number: '',
                odp: '',
                problem: '',
                description: '',
                teknisi_job_id: '',
                idTelegram: '',
            }
            REQUEST_TICKET_DATA.data = dataUnspect;
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan Speedy Number`, {
                parse_mode: 'HTML',
            })
            break;
        case 'Proman':
            const dataProman: PromanProps = {
                odp_name: '',
                distribusi: '',
                capacity_port: 0,
                status_port_use: 0,
                status_port_available: 0,
                odp_cradle: 0,
                opm_lenght: 0,
                teknisi_job_id: '',
                idTelegram: '',
            }
            REQUEST_TICKET_DATA.data = dataProman;
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan nama ODP`, {
                parse_mode: 'HTML',
            })
            break;
        default:
            const dataSqm: TicketSQMProps = {
                insiden_number: '',
                speedy_number: '',
                customer_name: '',
                problem: '',
                description: '',
                teknisi_job_id: '',
                idTelegram: '',
            }
            REQUEST_TICKET_DATA.data = dataSqm;
            await ctx.reply(`Anda memilih <b>${job_name}</b> \nSilahkan masukan IN (exp: INxxxx01)`, {
                parse_mode: 'HTML',
            })
            break;
    }
}