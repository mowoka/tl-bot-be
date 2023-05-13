import { ApiResponseType, Pagionation } from "@core/types"
import { ApiProperty } from "@nestjs/swagger"
import { TeamLeadUser } from "./team_lead_user"

export class TeamLeadUsersType {
    @ApiProperty({ type: [TeamLeadUser] })
    data: TeamLeadUser[]

    @ApiProperty({ type: Pagionation })
    metadata: Pagionation
}

export class TeamLeadUsersResponseType extends ApiResponseType {
    @ApiProperty({ type: TeamLeadUsersType })
    data: TeamLeadUsersType
}