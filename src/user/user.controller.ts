import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { user} from '@prisma/client'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get('me')
    getMe(@GetUser() user: user){
        console.log(user)
        return 'user me'
    }
}
