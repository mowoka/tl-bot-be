import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ValidateNikDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nik: string;
}