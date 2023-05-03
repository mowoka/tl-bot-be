import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class TiketTeamLeadDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    teknisi_user_id: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    jobId: number

    @IsString()
    @ApiProperty({ example: 'ini keterangan' })
    keterangan: string
}