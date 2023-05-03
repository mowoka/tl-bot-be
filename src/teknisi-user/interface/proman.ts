import { Job } from "./job";
import { TeknisiUser } from "./teknisi.user";


export interface Proman {
    id: number;
    createAt: Date;
    updateAt: Date;
    odp_name: string;
    distribusi: string;
    capacity_port: number;
    status_port_use: number
    status_port_available: number
    odp_cradle: number;
    opm_length: number
    teknisi_job_id: string;
    idTelegram: string;
    job: Job;
    teknisi_user_telegram: TeknisiUser;
}