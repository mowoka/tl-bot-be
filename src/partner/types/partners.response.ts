import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { Partner } from "./partner";

export class PartnersResponse extends ApiResponseType {
    @ApiProperty({ type: [Partner] })
    data: Partner[];
}