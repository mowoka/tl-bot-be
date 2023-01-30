import { TeknisiUserHistoryParams } from "../params"

export function generateParams(params: TeknisiUserHistoryParams) {
    const pageNumber = parseInt(params.page);

    const pagination = {
        skip: pageNumber === 1 ? 0 : (pageNumber - 1) * 10,
        take: 10,
    }

    return { pagination }
}


export function generateParamsUserTeknisi(page: string) {
    const pageNumber = parseInt(page);

    const pagination = {
        skip: pageNumber === 1 ? 0 : (pageNumber - 1) * 10,
        take: 10,
    }

    return { pagination }
}

export function generateParamsUserTeknisiReport(page: string) {
    const pageNumber = parseInt(page);

    const pagination = {
        skip: pageNumber === 1 ? 0 : (pageNumber - 1) * 10,
        take: 10,
    }

    return { pagination }
}

