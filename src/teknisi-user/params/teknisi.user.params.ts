import { ApiProperty } from "@nestjs/swagger"

export class TeknisiUserParams {
    @ApiProperty()
    partner: string

    @ApiProperty()
    sector: string

    @ApiProperty()
    regional: string

    @ApiProperty()
    page: string
}