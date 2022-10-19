import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nik: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
