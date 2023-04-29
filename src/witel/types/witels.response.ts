import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";
import { Witel } from "./witel";


export class WitelsResponse extends ApiResponseType {
    @ApiProperty({ type: [Witel] })
    data: Witel[];
}