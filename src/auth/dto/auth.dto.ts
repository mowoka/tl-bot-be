import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  nik: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  idTelegram: string;

  @IsString()
  @IsNotEmpty()
  partner: string;

  @IsString()
  @IsNotEmpty()
  sector: string;

  @IsString()
  @IsNotEmpty()
  witel: string;

  @IsString()
  @IsNotEmpty()
  regional: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
