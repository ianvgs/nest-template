import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { APP_PIPE } from '@nestjs/core';

describe('AppController', () => {
  let appController: AppController;
  let app: INestApplication;

  beforeEach(async () => {
    //Pra testar com chamada .http
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService,
        //Pra testar com chamada .http
        //Pra usar os bindings do class-validator
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({
            transform: true,
            whitelist: true,
          }),
        },],
    }).compile();

    //Pra testar com chamada .http
    app = moduleFixture.createNestApplication();
    //Pra testar com chamada .http
    await app.init();
    appController = app.get<AppController>(AppController);
  });

  //Pra testar com chamada .http
  afterEach(async () => {
    await app.close();
  });
  //Unit tests
  describe('AppController unit tests', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello Worlds from nest!');
    });
  });

  describe("appController http tests", () => {
    //http tests
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello Worlds from nest!');
    });

    //Query Test
    it('should throw error when not passing right query type/or null', () => {
      return request(app.getHttpServer())
        .post('/testing')
        .send({ testName: 'John', time: 30 }) // Request body parameters
        .query({ citys: 'New York' }) // Query parameters */
        .expect(400); // Adjust the expected status code
    });

    //Body Test
    it('should throw error when not passing right body type/or null', () => {
      return request(app.getHttpServer())
        .post('/testing')
        .send({ testName: 'John', times: true }) // Request body parameters
        .query({ city: 'New York' }) // Query parameters 
        .expect(400); // Adjust the expected status code
    });
  })

});
