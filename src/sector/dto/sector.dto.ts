import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SectorDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Cicadas' })
    name: string;
}