import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class WitelDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'CRM-01' })
    name: string;
}