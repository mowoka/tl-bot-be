import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1120120012212' })
  nik: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'YakinMokaz123!' })
  password: string;
}
