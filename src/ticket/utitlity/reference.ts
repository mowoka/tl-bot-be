export const regex = new RegExp(/[a-z]*([a-z])[a-z]*\1+[a-z]*/);


export interface RequestTiketProps {
    request_id: string;
    ticket_id: string;
    ticket_name: string;
    in_number: string;
    speedy_number: string;
    customer_number: string;
    reason: string;
    description: string;
    requestor: String;
}

export const REQUEST_TIKET: RequestTiketProps = {
    request_id: '',
    ticket_id: '',
    ticket_name: '',
    in_number: '',
    speedy_number: '',
    customer_number: '',
    reason: '',
    description: '',
    requestor: '',
}

export const REQUEST_TICKET_DATA: RequestTicketDataProps = {
    job_id: '',
    job_name: '',
    data: {
        insiden_number: '',
        speedy_number: '',
        customer_name: '',
        problem: '',
        description: '',
        teknisi_job_id: '',
        idTelegram: '',
    }
}

export interface RequestTicketDataProps {
    job_id: string,
    job_name: string,
    data: LaporLangsungProps | TutupOdpProps | TicketRegularProps | TicketSQMProps | PromanProps | UnspectProps | ValinsProps;
}

export interface LaporLangsungProps {
    speedy_number: string;
    customer_phone: string;
    customer_name: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface TutupOdpProps {
    odp_name: string;
    odp_address: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface TicketRegularProps {
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface TicketSQMProps {
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface PromanProps {
    odp_name: string;
    distribusi: string;
    capacity_port: number;
    status_port_use: number;
    status_port_available: number;
    odp_cradle: number;
    opm_lenght: number;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface UnspectProps {
    speedy_number: string;
    odp: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface ValinsProps {
    valins_id: string;
    odp: string;
    teknisi_job_id: string;
    idTelegram: string;
}