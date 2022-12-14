import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { ValidateNikDto } from './dto/validateNik.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('validate')
  validateNik(@Body() dto: ValidateNikDto) {
    return this.authService.validateNik(dto);
  }

  @Post('signup')
  signup(@Body('') dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.sign(dto);
  }
}
