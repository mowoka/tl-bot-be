import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { Sector } from "./sector";

export class SectorsResponse extends ApiResponseType {
    @ApiProperty({ type: [Sector] })
    data: Sector[];
}