/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/UserModule/dto/user.dto';
import { User } from 'src/UserModule/entities/user.entity';
import { UserService } from '../../services/user.service';

@Injectable()
export class UcCadastrarUser {
    constructor(private readonly userService: UserService) { }
    async run(user: CreateUserDto): Promise<User> {
        return this.userService.createUser(user);
    }
}
