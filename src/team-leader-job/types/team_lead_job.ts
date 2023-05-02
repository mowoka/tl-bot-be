import { ApiProperty } from "@nestjs/swagger";

export class TeamLeadJobTypes {
    @ApiProperty({ example: 4 })
    id: number;

    @ApiProperty({ example: 'gamastipea' })
    teknisi_job_code: string;

    @ApiProperty({ example: 'Gamas Tipe A' })
    name: string;

    @ApiProperty({ example: Date.now() })
    createdAt: Date;

    @ApiProperty({ example: Date.now() })
    updatedAt: Date;
}