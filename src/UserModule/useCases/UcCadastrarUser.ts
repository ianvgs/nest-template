/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/UserModule/dto/user.dto';
import { User } from 'src/UserModule/entities/user.entity';
import { UserService } from '../services/user.service';

@Injectable()
export class UcCadastrarUser {
    constructor(private readonly userService: UserService) { }
    async run(user: CreateUserDto): Promise<User> {



        if (user.nome === "papagaio") {
            throw new BadRequestException('Parça, abandona a profissão cara.')
        }


        return this.userService.createUser(user);
    }
}
