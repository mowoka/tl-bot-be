import { ApiResponseType, Pagionation } from "@core/types";
import { TeknisiUserType } from "./teknisi.user";
import { ApiProperty } from "@nestjs/swagger";


export class TeknisiUsersType {
    @ApiProperty({ type: [TeknisiUserType] })
    data: TeknisiUserType[]

    @ApiProperty({ type: Pagionation })
    metadata: Pagionation
}

export class TeknisiUsersResponseType extends ApiResponseType {
    @ApiProperty({ type: TeknisiUsersType })
    data: TeknisiUsersType
}