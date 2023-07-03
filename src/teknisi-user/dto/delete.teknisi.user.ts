import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class DeleteTeknisiUserDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    teknisi_user_id: number
}