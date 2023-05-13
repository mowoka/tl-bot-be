import { ApiProperty } from "@nestjs/swagger";

export class TeknisiUserType {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: Date.now() })
    createAt: Date;

    @ApiProperty({ example: Date.now() })
    updateAt: Date;

    @ApiProperty({ example: '1120120012214' })
    nik: string;

    @ApiProperty({ example: 'giomowoka' })
    name: string;

    @ApiProperty({ example: '083821148288' })
    idTelegram: string;
}