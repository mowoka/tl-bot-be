import { TeknisiJob } from "@ticket/types";

const excludeTiket = ['Tiket Gaul Reguler', "Tiket Gaul SQM", "Tiket Gaul US"]

export function getTeknisiJobs(teknisi_jobs: TeknisiJob[]): TeknisiJob[] {
    const result = teknisi_jobs.filter(e => !excludeTiket.includes(e.name))
    return result;
}