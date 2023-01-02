import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class TiketTeamLead {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    teknisi_user_id: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    jobId: number

    @IsString()
    @ApiProperty()
    keterangan: string
}