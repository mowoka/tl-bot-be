import { JobLead } from "./job";
import { TeknisiUser } from "./teknisi.user";

export interface TiketTeamLead {
    id: number;
    createAt: Date;
    updateAt: Date;
    description: string;
    teknisi_user_id: number;
    team_lead_job_id: number;
    job: JobLead;
    teknisi: TeknisiUser;
}