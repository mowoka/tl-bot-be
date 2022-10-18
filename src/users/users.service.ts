import { Injectable } from "@nestjs/common";
import { User } from "./schema";
import { UserRepository } from "./users.repository";
import {v4 as uuid} from 'uuid'


@Injectable()
export class UserService{
    constructor(private readonly userRepository: UserRepository){}

    async getUserById(userId: string): Promise<User>{
        return this.userRepository.findOne({userId})
    }

    async getUsers(): Promise<User[]>{
        return this.userRepository.find({})
    }

    // async createUser(): Promise<User[]>{
    //     return this.userRepository.create({
    //         userId: uuid(),

    //     })
    // }
}