import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PartnerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Telkom Akses' })
    name: string;
}