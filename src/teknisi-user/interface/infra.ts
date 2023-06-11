import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";


export interface Infra {
    id: number;
    createAt: Date;
    updateAt: Date;
    insiden_number: string;
    description: string;
    date: string;
    teknisi_job_id: string;
    idTelegram: string;
    job: Job;
    teknisi_user_telegram: TeknisiUser;
}