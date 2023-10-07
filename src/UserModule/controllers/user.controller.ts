/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';


import { User } from '../entities/user.entity';
import { UcCadastrarUser } from '../useCases/UcCadastrarUser';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/user.dto';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/createPayment.dto';


@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(
    /* @Inject('PAYMENT_SERVICE') private readonly paymentService: PaymentService, */
    private readonly ucCadastrarUser: UcCadastrarUser
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates user.', description: 'Create an user and return it from database.' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.ucCadastrarUser.run(user);
  }

  @Get()
  async getUsers(@Req() request: Request, @Res() response: Response) {
    const { name, id } = request.query;
    if (!name || !id) {
      response.status(400).send({ msg: ' Missing data' })

    } else {
      response.send(200)
    }
  }

  /*   @Post('/payment')
    @ApiOperation({ summary: 'Creates payment.', description: 'Create an payment.' })
    @ApiBody({ type: CreatePaymentDto })
    async createPayment(@Body() payment: CreatePaymentDto): Promise<any> {
      return await this.paymentService.createPayment(payment)
    } */


  //Nos casos de params /user/1
  /*   @Get(':id')
    @ApiParam({ name: 'id', type: Number }) */

  //Nos casos de query
  /*   @Get()
    @ApiQuery({ name: 'page', type: Number, required: false }) */

}
