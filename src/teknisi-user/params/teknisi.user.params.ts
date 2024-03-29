import { ApiProperty } from "@nestjs/swagger"

export class TeknisiUserParams {
    @ApiProperty({ example: 1 })
    partner_id: number

    @ApiProperty({ example: 1 })
    sector_id: number

    @ApiProperty({ example: 1 })
    regional_id: number

    @ApiProperty({ example: 1 })
    witel_id: number

    @ApiProperty({ example: 1 })
    user_id: number

    @ApiProperty({ example: 1 })
    page: string
}