import { ApiResponseType } from "@core/types";
import { Sector } from "./sector";
import { ApiProperty } from "@nestjs/swagger";

export class SectorResponse extends ApiResponseType {
    @ApiProperty({ example: Sector })
    data: Sector;
}