import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ValidateNikDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1120120012212' })
    nik: string;
}