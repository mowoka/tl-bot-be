import { ApiProperty } from "@nestjs/swagger";

export class Pagionation {
    @ApiProperty({ example: 10 })
    total: number

    @ApiProperty({ example: 2 })
    page: number

    @ApiProperty({ example: 1 })
    pagination: number
}