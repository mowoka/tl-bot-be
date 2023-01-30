import { ApiProperty } from "@nestjs/swagger"

export class TeknisiUserReportParams {
    @ApiProperty()
    partner: string

    @ApiProperty()
    sector: string

    @ApiProperty()
    regional: string

    @ApiProperty()
    page: string

    @ApiProperty()
    createAt: {
        gte: Date,
        lt: Date,
    }
}