export const regex = new RegExp(/[a-z]*([a-z])[a-z]*\1+[a-z]*/);


interface RequestTiketProps {
    request_id: string;
    ticket_id: string;
    ticket_name: string;
    in_number: string;
    speedy_number: string;
    customer_number: string;
    reason: string;
    description: string;
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
}