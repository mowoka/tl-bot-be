import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";



export interface Unspect {
    id: number;
    createAt: Date;
    updateAt: Date;
    speedy_number: string;
    odp: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
    job: Job;
    teknisi_user_telegram: TeknisiUser;
}