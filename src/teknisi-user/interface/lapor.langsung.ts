

import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";

export interface LaporLangsung {
    id: number;
    createAt: Date;
    updateAt: Date;
    speedy_number: string;
    customer_phone: string;
    customer_name: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
    job: Job;
    teknisi_user_telegram: TeknisiUser;
}