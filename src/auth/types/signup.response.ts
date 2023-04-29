import { ApiResponseType } from "@core/types";
import { Token } from "./token";
import { ApiProperty } from "@nestjs/swagger";

export class SignupResponse extends ApiResponseType {
    @ApiProperty()
    data: Token
}