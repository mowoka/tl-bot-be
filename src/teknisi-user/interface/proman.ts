import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";


export interface Proman {
    id: number;
    createAt: Date;
    updateAt: Date;
    odp_name: string;
    distribusi: string;
    capacity_port: string;
    status_port_use: string
    status_port_available: string
    odp_cradle: string;
    opm_length: string
    teknisi_job_id: string;
    idTelegram: string;
    job: Job;
    teknisi_user_telegram: TeknisiUser;
}