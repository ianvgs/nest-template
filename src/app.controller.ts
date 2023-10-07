import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiBody } from '@nestjs/swagger';

// MOCK
import {
  IsInt,
  IsNotEmpty, IsString, validate
} from 'class-validator';
import { plainToInstance } from 'class-transformer';
export class CreateTestingBody {
  @IsNotEmpty()
  @IsString()
  testName: string;
  @IsInt()
  @IsNotEmpty()
  times: number;
}
export class CreateTestingQuery {
  @IsNotEmpty()
  @IsString()
  city: string;
}
// MOCK


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/testing')
  @ApiOperation({ summary: 'Creates test.', description: 'Create an test.' })
  @ApiBody({ type: CreateTestingBody })
  async createTesting(@Body() testing: CreateTestingBody, @Query() myQuery: CreateTestingQuery): Promise<any> {
    return "Great!"
  }
}
