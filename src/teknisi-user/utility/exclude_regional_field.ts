export function excludeRegionalField<Regional, Key extends keyof Regional>(
    regional: Regional,
    keys: Key[]
): Omit<Regional, Key> {
    for (let key of keys) {
        delete regional[key]
    }
    return regional
}