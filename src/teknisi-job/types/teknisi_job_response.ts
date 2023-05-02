import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { TeknisiJob } from "./teknisi_job";

export class TeknisiJobResponseType extends ApiResponseType {
    @ApiProperty({ type: TeknisiJob })
    data: TeknisiJob
}