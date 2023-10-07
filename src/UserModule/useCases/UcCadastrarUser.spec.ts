
import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "../services/user.service"
import { UcCadastrarUser } from "./UcCadastrarUser"
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { dataSourceMock } from "../../mocks/dataSourceMock";
import { CreateUserDto } from "src/UserModule/dto/user.dto";
import { BadRequestException } from "@nestjs/common";

describe('UseCaseCadastrarUser', () => {
    let userService: UserService;
    let ucCadastrarUser: UcCadastrarUser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UcCadastrarUser,
                UserService,
                {
                    //Se passar a conexão errado ele quebra :)
                    provide: getDataSourceToken("user_connection"),
                    useValue: dataSourceMock
                },
                {    //Se passar a conexão errado ele quebra :)
                    provide: getRepositoryToken(User, "user_connection"),
                    useValue: {

                    },
                },
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
        ucCadastrarUser = module.get<UcCadastrarUser>(UcCadastrarUser)
    })
    //Checa pelas definições  se nao passar as outras nao passarão tambem
    it('User Service deve estar definido:', () => {
        expect(userService).toBeDefined();
    });
    it('ucCadastrarUser deve estar definido:', () => {
        expect(ucCadastrarUser).toBeDefined();
    });


    /////////////////////////////////////
    //1) Testa se useCase processa os inputs e lança os devidos erros
    it('should throw and BadRequestError', async () => {
        try {
            await ucCadastrarUser.run({ nome: 'papagaio' });
            fail('Expected an error to be thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toBe('Parça, abandona a profissão cara.');
        }
    });

    /////////////////////////////////////
    //2) Testa se useCase processa os inputs e chega na função do service corretamente
    it('should create a user', async () => {
        //Mock do return do service (OBRIGATÓRIO)
        const mockCreatedUser: User = {
            id: 1,
            nome: 'Test User',
            createdAt: new Date()
        };
        userService.createUser = jest.fn().mockResolvedValue(mockCreatedUser);

        //Params e teste unitario
        const createUserDto: CreateUserDto = {
            nome: 'Test User',
        };
        const createdUser = await ucCadastrarUser.run(createUserDto);
        expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
        expect(createdUser).toEqual(mockCreatedUser);
    });

    //E se der erro no service, como o usecase handle it?
    /*     it('should handle errors', async () => { 
            userService.createUser = jest.fn().mockRejectedValue(new Error('Test error'));
            const createUserDto: CreateUserDto = {
                nome: 'Test User',
            };
            try {
                await ucCadastrarUser.run(createUserDto);
                fail('Expected an error to be thrown');
            } catch (error) {
                expect(error.message).toBe('Test error');
            }
        }); */
})




