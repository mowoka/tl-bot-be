import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { Partner } from "./partner";

export class PartnerResponse extends ApiResponseType {
    @ApiProperty({ example: Partner })
    data: Partner;
}