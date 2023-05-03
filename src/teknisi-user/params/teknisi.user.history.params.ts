import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class TeknisiUserHistoryParams {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    user_id: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'laporlangsung' })
    job_title: string

    @ApiProperty()
    page: string
}