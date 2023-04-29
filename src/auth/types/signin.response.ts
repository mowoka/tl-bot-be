import { ApiResponseType } from "@core/types";
import { ApiProperty } from "@nestjs/swagger";

export class SigninResponse extends ApiResponseType {
    @ApiProperty()
    data: string
}