/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';


import { User } from '../entities/user.entity';
import { UcCadastrarUser } from '../useCases/userUseCases/UcCadastrarUser';
import { Request } from 'express';
import { CreateUserDto } from '../dto/user.dto';


@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(
    private readonly ucCadastrarUser: UcCadastrarUser
  ) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.ucCadastrarUser.run(user);
  }

  //Nos casos de params /user/1
  /*   @Get(':id')
    @ApiParam({ name: 'id', type: Number }) */

  //Nos casos de query
  /*   @Get()
    @ApiQuery({ name: 'page', type: Number, required: false }) */

}
