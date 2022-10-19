import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { user} from '@prisma/client'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('users')
export class UserController {

    @Get('me')
    getMe(@GetUser() user: user){
        return user
    }
}
