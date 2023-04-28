import { ApiProperty } from "@nestjs/swagger";

export class ErrorServerResponse {
    @ApiProperty({ example: 500 })
    statusCode: number;

    @ApiProperty({ example: 'Internal Server Error' })
    message: string;

    @ApiProperty({ example: false })
    status: boolean;
}