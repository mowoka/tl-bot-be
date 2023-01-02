export interface Job {
    id: string;
    createAt: Date;
    updateAt: Date;
    name: string;
    point: number;
}

export interface JobLead {
    id: number;
    createAt: Date;
    updateAt: Date;
    name: string;
    point: number;
}