import { REQUEST_TICKET_DATA, TICKET_LAPOR_LANGUSNG_DATA, TICKET_PROMAN_DATA, TICKET_REGULER_DATA, TICKET_SQM_DATA, TICKET_TUTUP_ODP_DATA, TICKET_UNSPECT_DATA, TICKET_VALINS_DATA } from './reference'
export const resetTicketData = () => {
    // request ticket
    REQUEST_TICKET_DATA.job_id = '';
    REQUEST_TICKET_DATA.job_name = '';
    REQUEST_TICKET_DATA.idTelegram = '';
    // lapor langsung
    TICKET_LAPOR_LANGUSNG_DATA.speedy_number = ''
    TICKET_LAPOR_LANGUSNG_DATA.customer_phone = ''
    TICKET_LAPOR_LANGUSNG_DATA.customer_name = ''
    TICKET_LAPOR_LANGUSNG_DATA.problem = ''
    TICKET_LAPOR_LANGUSNG_DATA.description = ''
    // tutup odp
    TICKET_TUTUP_ODP_DATA.odp_name = ''
    TICKET_TUTUP_ODP_DATA.odp_address = ''
    // sqm ticket
    TICKET_SQM_DATA.insiden_number = ''
    TICKET_SQM_DATA.speedy_number = ''
    TICKET_SQM_DATA.customer_name = ''
    TICKET_SQM_DATA.customer_phone = ''
    TICKET_SQM_DATA.problem = ''
    TICKET_SQM_DATA.description = ''
    // tiket reguler
    TICKET_REGULER_DATA.insiden_number = ''
    TICKET_REGULER_DATA.speedy_number = ''
    TICKET_REGULER_DATA.customer_name = ''
    TICKET_REGULER_DATA.customer_phone = ''
    TICKET_REGULER_DATA.problem = ''
    TICKET_REGULER_DATA.description = ''
    // proman
    TICKET_PROMAN_DATA.odp_name = ''
    TICKET_PROMAN_DATA.distribusi = ''
    TICKET_PROMAN_DATA.capacity_port = ''
    TICKET_PROMAN_DATA.status_port_use = ''
    TICKET_PROMAN_DATA.status_port_available = ''
    TICKET_PROMAN_DATA.odp_cradle = ''
    TICKET_PROMAN_DATA.opm_length = ''
    // unspect 
    TICKET_UNSPECT_DATA.speedy_number = ''
    TICKET_UNSPECT_DATA.odp = ''
    TICKET_UNSPECT_DATA.problem = ''
    TICKET_UNSPECT_DATA.description = ''
    // valins
    TICKET_VALINS_DATA.valins_id = ''
    TICKET_VALINS_DATA.odp = ''

}