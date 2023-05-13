import { OptionsType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";

export class TeamLeadUser {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: '1120120012212' })
    nik: string;

    @ApiProperty({ example: 'Mokaz' })
    name: string;

    @ApiProperty({ example: 'team-lead' })
    role: string;

    @ApiProperty({ type: OptionsType })
    partner: OptionsType;

    @ApiProperty({ type: OptionsType })
    witel: OptionsType;

    @ApiProperty({ type: OptionsType })
    sector: OptionsType;

    @ApiProperty({ type: OptionsType })
    regional: OptionsType;

}