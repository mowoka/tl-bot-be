import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { Partner } from "@partner/types";
import { Regional } from "@regional/types";
import { Sector } from "@sector/types";
import { Witel } from "@witel/types";


export class DataMasterFilter {
    @ApiProperty({ type: [Regional] })
    regional: Regional[]

    @ApiProperty({ type: [Sector] })
    sector: Sector[]

    @ApiProperty({ type: [Partner] })
    partner: Partner[]

    @ApiProperty({ type: [Witel] })
    witel: Witel[]
}

export class MasterFilterResponseType extends ApiResponseType {
    @ApiProperty({ type: DataMasterFilter })
    data: DataMasterFilter
}