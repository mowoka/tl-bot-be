import { ApiProperty } from "@nestjs/swagger";

export class OptionsType {
    @ApiProperty({ example: 1 })
    id: number;
    @ApiProperty({ example: 'Dummy' })
    name: string;
}