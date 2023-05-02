import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { TeamLeadJobTypes } from "./team_lead_job";


export class TeamLeadJobsResponseType extends ApiResponseType {
    @ApiProperty({ type: [TeamLeadJobTypes] })
    data: TeamLeadJobTypes[]
}