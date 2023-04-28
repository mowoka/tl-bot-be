import { ApiProperty } from "@nestjs/swagger";

export class ApiResponseType {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    status: boolean;
}