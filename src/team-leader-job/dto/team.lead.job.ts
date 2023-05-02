import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TeamLeadJob {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Gamas Tipe A' })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 4 })
    point: number
}