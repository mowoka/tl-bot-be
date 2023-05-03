

import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";

export interface TutupOdp {
    id: number;
    createAt: Date;
    updateAt: Date;
    odp_name: string;
    odp_address: string;
    teknisi_job_id: string;
    idTelegram: string;
    job: Job;
    teknisi_user_telegram: TeknisiUser;
}