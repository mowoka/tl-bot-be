import { ApiProperty } from "@nestjs/swagger";

export class Partner {
    @ApiProperty()
    id: number;

    @ApiProperty()
    partner_code: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}