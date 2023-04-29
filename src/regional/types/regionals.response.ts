import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { Regional } from "./regional";

export class RegionalsResponse extends ApiResponseType {
    @ApiProperty({ type: [Regional] })
    data: Regional[];
}