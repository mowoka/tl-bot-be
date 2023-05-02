import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TeknsiJob {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Tiket Reguler' })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    point: number
}