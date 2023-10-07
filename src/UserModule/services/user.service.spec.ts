
import { Test, TestingModule } from "@nestjs/testing"
import { DataSource, Repository } from "typeorm"
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm"
import { User } from "../entities/user.entity"
import { UserService } from "./user.service"
import { dataSourceMock } from "../../../src/mocks/dataSourceMock"
import { queryRunnerMock } from "../../../src/mocks/dataSourceMock"

describe('UserService', () => {
    //Declara: O service à ser testado e injeções realizadas nele
    let userService: UserService;
    let dataSource: DataSource;
    let userRepository: Repository<User>;

    //Mock user
    const userMock = new User('ian')

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                //O service que eu vou testar
                UserService,
                //As injeções de model e datasource que eu realizo nele
                {
                    provide: getRepositoryToken(User, "user_connection"),
                    useValue: {
                        findOneBy: jest.fn().mockResolvedValue(userMock),
                        find: jest.fn().mockResolvedValue([userMock])
                    },
                },
                {
                    provide: getDataSourceToken("user_connection"),
                    useValue: dataSourceMock
                }
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
        userRepository = module.get<Repository<User>>(getRepositoryToken(User, "user_connection"));
        dataSource = module.get<DataSource>(getDataSourceToken("user_connection"));
    })
    //Checa pelas definições  se nao passar as outras nao passarão tambem
    it('userService deve estar definido:', () => {
        expect(userService).toBeDefined();
    });
    it('userRepository deve estar definido:', () => {
        expect(userRepository).toBeDefined();
    });
    it('dataSource deve estar definido:', () => {
        expect(dataSource).toBeDefined();
    });

    //Testa as funções do datasource
    describe("Using dataSource and queryrunners context:", () => {
        /////////////////
        it('should create a user', async () => {
            const createdUserDto = {
                nome: 'John Doe',
            };
            const generatedUser = new User('John Doe');
            // Mock the behavior of the manager.save function
            queryRunnerMock.manager.save.mockResolvedValue(generatedUser);
            const createdUser = await userService.createUser(createdUserDto);
            // Check that the queryRunner methods were called as expected
            expect(queryRunnerMock.connect).toBeCalled();
            expect(queryRunnerMock.startTransaction).toBeCalled();
            expect(queryRunnerMock.manager.save).toBeCalledWith(User, generatedUser);
            expect(queryRunnerMock.commitTransaction).toBeCalled();
            expect(queryRunnerMock.release).toBeCalled();
            // Check that the created user matches the expected result
            expect(createdUser).toEqual(generatedUser);
        });
        /////
        it('should handle errors and rollback transaction', async () => {
            const createUserDto = {
                nome: 'John Doe',
            };
            // Mock the behavior to simulate an error
            queryRunnerMock.manager.save.mockRejectedValue(new Error('Some error'));
            try {
                await userService.createUser(createUserDto);
            } catch (error) {
                // Check that the queryRunner methods were called as expected
                expect(queryRunnerMock.connect).toBeCalled();
                expect(queryRunnerMock.startTransaction).toBeCalled();
                expect(queryRunnerMock.manager.save).toBeCalledWith(User, expect.any(User));
                expect(queryRunnerMock.rollbackTransaction).toBeCalled();
                expect(queryRunnerMock.release).toBeCalled();

                // Check that the error is handled as expected
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('Some error');
            }
        });
    })

    //Testa as funcoes unitarias
    //Testo a função do service e o retorno da funcao da model
    describe("Métodos do service:", () => {
        it('Deve retornar um array de usuarios', async () => {
            const todosUsuarios = await userService.findAll()
            expect(todosUsuarios).toStrictEqual([userMock]);
        });

        it('Deve retornar uma usuario por id', async () => {
            const umUsuario = await userService.getById(123)
            expect(umUsuario).toStrictEqual(userMock);
        });

        it('Deve somar direito a função num', async () => {
            const valueParam = 1
            const soma = await userService.addNumbers(valueParam, valueParam)
            expect(soma).toStrictEqual(2);
        });
    });
})




