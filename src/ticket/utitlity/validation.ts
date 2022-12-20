import { REQUEST_TIKET } from './reference';
export const validationRequestTicket = (): boolean => {
    if (!REQUEST_TIKET.request_id || !REQUEST_TIKET.ticket_id || !REQUEST_TIKET.ticket_name || !REQUEST_TIKET.in_number || !REQUEST_TIKET.speedy_number || !REQUEST_TIKET.customer_number || !REQUEST_TIKET.reason || !REQUEST_TIKET.description) {
        return false;
    }
    return true;
}