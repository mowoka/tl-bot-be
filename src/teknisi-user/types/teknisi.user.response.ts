import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { TeknisiUserType } from "./teknisi.user";

export class TeknisiUserResponseType extends ApiResponseType {
    @ApiProperty({ type: TeknisiUserType })
    data: TeknisiUserType
}