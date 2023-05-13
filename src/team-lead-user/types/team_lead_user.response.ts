import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { TeamLeadUser } from "./team_lead_user";

export class TeamLeadUserResponseType extends ApiResponseType {
    @ApiProperty({ type: TeamLeadUser })
    data: TeamLeadUser
}