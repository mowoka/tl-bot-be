export interface TeknisiHistoryParams {
    skip: number;
    take: number;
    idTelegram: string;
    gte: Date;
    lt: Date;
}