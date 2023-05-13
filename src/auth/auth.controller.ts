import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto, ValidateNikDto } from './dto';
import { ApiResponseType, BadRequestResponse, ErrorServerResponse } from '@core/types';
import { SigninResponse, SignupResponse } from './types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('validate/team-lead')
  @ApiCreatedResponse({ status: 201, description: 'Create Sector Successfull', type: ApiResponseType })
  @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
  @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
  validateTeamLeadNik(@Body() dto: ValidateNikDto) {
    return this.authService.validateTeamLeadNik(dto);
  }

  @Post('validate/teknisi-user')
  @ApiCreatedResponse({ status: 201, description: 'Create Sector Successfull', type: ApiResponseType })
  @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
  @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
  validateTeknisiUserNik(@Body() dto: ValidateNikDto) {
    return this.authService.validateTeknisiUserNik(dto);
  }

  @Post('signup')
  @ApiCreatedResponse({ status: 201, description: 'Create Sector Successfull', type: SignupResponse })
  @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
  @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
  signup(@Body('') dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiCreatedResponse({ status: 201, description: 'Create Sector Successfull', type: SigninResponse })
  @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestResponse, })
  @ApiResponse({ status: 500, description: 'Internal Server Error', type: ErrorServerResponse, })
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }
}
