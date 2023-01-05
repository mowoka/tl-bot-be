import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class TeknisiUserHistoryParams {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nik: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ticket_title: string

    @ApiProperty()
    page: string
}