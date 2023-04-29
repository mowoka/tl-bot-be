import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { Regional } from "./regional";

export class RegionalResponse extends ApiResponseType {
    @ApiProperty({ example: Regional })
    data: Regional;
}