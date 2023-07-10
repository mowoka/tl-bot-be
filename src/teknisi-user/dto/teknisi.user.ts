import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class TeknisiUser {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1120120012214' })
    nik: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'giomowoka' })
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1499836287' })
    idTelegram: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    partner_id: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    sector_id: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    witel_id: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    regional_id: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    isActive: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    user_id: number
}