/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/UserModule/entities/user.entity';
import { UserService } from 'src/UserModule/services/user.service';

@Injectable()
export class UcCadastrarUser {
    constructor(private readonly userService: UserService) { }
    async run(user: Partial<User>): Promise<User> {
        return this.userService.cadastrarUser(user);
    }
}
