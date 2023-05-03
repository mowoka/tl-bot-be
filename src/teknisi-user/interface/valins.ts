import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";

export interface Valins {
    id: number;
    createAt: Date;
    updateAt: Date;
    valins_id: string;
    odp: string;
    teknisi_job_id: string;
    idTelegram: string;
    job: Job;
    teknisi_user_telegram: TeknisiUser;
}