import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { Witel } from "./witel";

export class WitelResponse extends ApiResponseType {
    @ApiProperty({ example: Witel })
    data: Witel;
}