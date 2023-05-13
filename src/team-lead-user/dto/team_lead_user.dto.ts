import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TeamLeadUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1120120012212' })
    nik: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Mokaz' })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    partner_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    sector_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    witel_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    regional_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'YakinMokaz123!' })
    password: string;
}