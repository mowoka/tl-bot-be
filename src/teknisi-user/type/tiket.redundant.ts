import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";


export interface TiketRedundant {
    id: number;
    createAt: Date;
    updateAt: Date;
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    problem: string;
    description: string;
    minus_point: number;
    job_id: string;
    idTelegram: string;
    job: Job;
    teknisi_user_telegram: TeknisiUser;
}