import { ApiProperty } from "@nestjs/swagger"

export class TeamLeadUserParams {
    @ApiProperty({ example: 1 })
    partner_id: number

    @ApiProperty({ example: 1 })
    sector_id: number

    @ApiProperty({ example: 1 })
    regional_id: number

    @ApiProperty({ example: 1 })
    witel_id: number

    @ApiProperty({ example: 1 })
    page: string
}