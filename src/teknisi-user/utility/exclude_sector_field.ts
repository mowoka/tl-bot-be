export function excludeSectorField<Sector, Key extends keyof Sector>(
    sector: Sector,
    keys: Key[]
): Omit<Sector, Key> {
    for (let key of keys) {
        delete sector[key]
    }
    return sector
}