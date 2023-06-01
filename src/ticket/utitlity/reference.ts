export const regex = new RegExp(/[a-z]*([a-z])[a-z]*\1+[a-z]*/);


export const TICKET_REGULER_DATA: TicketRegularProps = {
    insiden_number: '',
    speedy_number: '',
    customer_name: '',
    customer_phone: '',
    problem: '',
    description: '',
}

export const TICKET_LAPOR_LANGUSNG_DATA: LaporLangsungProps = {
    speedy_number: '',
    customer_phone: '',
    customer_name: '',
    problem: '',
    description: '',
}

export const TICKET_TUTUP_ODP_DATA: TutupOdpProps = {
    odp_name: '',
    odp_address: '',
}

export const TICKET_SQM_DATA: TicketSQMProps = {
    insiden_number: '',
    speedy_number: '',
    customer_name: '',
    customer_phone: '',
    problem: '',
    description: '',
}

export const TICKET_PROMAN_DATA: PromanProps = {
    odp_name: '',
    distribusi: '',
    capacity_port: '',
    status_port_use: '',
    status_port_available: '',
    odp_cradle: '',
    opm_length: '',
}

export const TICKET_UNSPECT_DATA: UnspectProps = {
    speedy_number: '',
    odp: '',
    problem: '',
    description: '',
}

export const TICKET_VALINS_DATA: ValinsProps = {
    valins_id: '',
    odp: '',
}

export const TICKET_INFRA: TicketInfra = {
    insiden_number: '',
    description: '',
    date: '',
}

export const TICKET_BANTEK: TicketBantek = {
    ticket_number: '',
    description: '',
    date: '',
    teknisi_bantek: '',
}

export const REQUEST_TICKET_DATA: RequestTicketDataProps = {
    job_id: '',
    job_name: '',
    idTelegram: '',
    data: TICKET_REGULER_DATA
}




export interface LaporLangsungProps {
    speedy_number: string;
    customer_phone: string;
    customer_name: string;
    problem: string;
    description: string;
}

export interface TutupOdpProps {
    odp_name: string;
    odp_address: string;
}

export interface TicketRegularProps {
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    customer_phone: string;
    problem: string;
    description: string;
}

export interface TicketSQMProps {
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    customer_phone: string;
    problem: string;
    description: string;
}

export interface PromanProps {
    odp_name: string;
    distribusi: string;
    capacity_port: string;
    status_port_use: string;
    status_port_available: string;
    odp_cradle: string;
    opm_length: string;
}

export interface UnspectProps {
    speedy_number: string;
    odp: string;
    problem: string;
    description: string;
}

export interface ValinsProps {
    valins_id: string;
    odp: string;
}

export interface KendalaSQMProps {
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    customer_number: string;
    problem: string;
    description: string;
}

export interface TicketInfra {
    insiden_number: string;
    description: string;
    date: string;
}

export interface TicketBantek {
    ticket_number: string;
    description: string;
    date: string;
    teknisi_bantek: string;
}

export interface RequestTicketDataProps {
    job_id: string,
    job_name: string,
    idTelegram: string;
    data: LaporLangsungProps | TutupOdpProps | TicketRegularProps | TicketSQMProps | PromanProps | UnspectProps | ValinsProps | KendalaSQMProps | TicketInfra | TicketBantek;
}