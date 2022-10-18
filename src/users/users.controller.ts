import { Controller, Get, Param } from "@nestjs/common";
import { User } from "./schema";
import { UserService } from "./users.service";


@Controller('users')
export class UserController{
    constructor(private readonly usersService: UserService){}

    @Get(':userId')
    async getUser(@Param('userId') userId:string): Promise<User>{
        return this.usersService.getUserById(userId)
    }

    @Get()
    async getUsers(): Promise<User[]>{
        return this.usersService.getUsers()
    }
}