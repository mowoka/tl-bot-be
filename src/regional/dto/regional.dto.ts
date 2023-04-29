import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RegionalDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Jawa Barat' })
    name: string;
}