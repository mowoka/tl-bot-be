import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    nik: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}