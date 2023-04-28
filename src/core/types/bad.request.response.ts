import { ApiProperty } from "@nestjs/swagger";

export class BadRequestResponse {
    @ApiProperty({ example: 400 })
    statusCode: number;

    @ApiProperty({ example: ['Something Error'] })
    message: string[];

    @ApiProperty({ example: 'Bad Request', required: false })
    error?: string;
}