import { Partner } from "@partner/types"
import { Regional } from "@regional/types"
import { Sector } from "@sector/types"
import { Witel } from "@witel/types"

export class User {
    id: number
    createAt: Date
    updateAt: Date
    nik: string
    name: string
    role: string
    partner_id: number
    sector_id: number
    witel_id: number
    regional_id: number
    sector: Sector
    partner: Partner
    witel: Witel
    regional: Regional
}