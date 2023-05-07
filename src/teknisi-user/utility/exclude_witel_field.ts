export function excludeWitelField<Witel, Key extends keyof Witel>(
    witel: Witel,
    keys: Key[]
): Omit<Witel, Key> {
    for (let key of keys) {
        delete witel[key]
    }
    return witel
}