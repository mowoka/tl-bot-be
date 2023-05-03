
import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";

export interface TiketReguler {
    id: number;
    createAt: Date;
    updateAt: Date;
    insiden_number: string
    speedy_number: string
    customer_name: string,
    customer_number: string,
    problem: string,
    description: string,
    teknisi_job_id: string,
    idTelegram: string,
    job: Job,
    teknisi_user_telegram: TeknisiUser,
}