import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nik: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  idTelegram: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  partner: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sector: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  witel: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  regional: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
