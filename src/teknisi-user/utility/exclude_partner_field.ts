export function excludePartnerField<Partner, Key extends keyof Partner>(
    partner: Partner,
    keys: Key[]
): Omit<Partner, Key> {
    for (let key of keys) {
        delete partner[key]
    }
    return partner
}