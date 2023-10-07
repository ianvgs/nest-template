/* 
@@@@@@ COMENTARIOS 
@@@@@@ Só vale a pena criar controller test se o controller usar o req.query por enquanto
*/
import { PaymentService } from '../services/payment.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { BadRequestException, Controller } from '@nestjs/common';
import { Request, Response } from 'express';
import { UcCadastrarUser } from '../useCases/UcCadastrarUser';


describe('UserController', () => {
  let userController: UserController;

  /////////////MOCKS
  const requestMock = {
    query: {}
  } as unknown as Request;

  //Tive que abstrair de dentro do responseMock pra conseguir usar o expect
  const statusResponseMock = {
    send: jest.fn((x) => x)
  }
  const responseMock = {
    //Caso positivo status().send()
    /* status: jest.fn((x) => ({
      send: jest.fn((y) => x)
    })), */
    status: jest.fn((x) => statusResponseMock),
    //Caso negativo .send()
    send: jest.fn((x) => x)
  } as unknown as Response;


  const mockUcCadastrarUser = {}
  /////////////FIM DOS MOCKS



  //Inicializa um mockModule com as injeções.
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UcCadastrarUser,
          useValue: mockUcCadastrarUser,
        },
      ],

    }).compile();
    userController = app.get<UserController>(UserController);

  });

  it('Expect  userControllerto be defined"', () => {
    expect(userController).toBeDefined();
  });
  /*   it('Expect  paymentService to be defined"', () => {
      expect(paymentService).toBeDefined();
    }); */


  describe('getUsers', () => {
    it('Should return 400 when not passing params"', () => {
      userController.getUsers(requestMock, responseMock)
      expect(responseMock.status).toHaveBeenCalledWith(400)
      expect(statusResponseMock.send).toHaveBeenCalledWith({ msg: ' Missing data' })
    });

    it('Should return 200 when passing right params"', () => {
      requestMock.query = {
        name: "ian",
        id: "tester"
      }
      userController.getUsers(requestMock, responseMock)
      expect(responseMock.send).toHaveBeenCalledWith(200)
    });
  })




})