import { ApiProperty } from "@nestjs/swagger";

export class TeknisiJob {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'tiketreguler' })
    teknisi_job_code: string;

    @ApiProperty({ example: 'Tiket Reguler' })
    name: string;

    @ApiProperty({ example: Date.now() })
    createdAt: Date;

    @ApiProperty({ example: Date.now() })
    updatedAt: Date;
}