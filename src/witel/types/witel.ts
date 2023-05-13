import { ApiProperty } from "@nestjs/swagger";

export class Witel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    witel_code: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}