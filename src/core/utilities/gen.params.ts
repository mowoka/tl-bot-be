export function generateParams(page: string) {
    const pageNumber = parseInt(page);

    const pagination = {
        skip: pageNumber === 1 ? 0 : (pageNumber - 1) * 10,
        take: 10,
    }

    return { pagination }
}