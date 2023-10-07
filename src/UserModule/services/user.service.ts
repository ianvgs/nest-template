import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'user_connection')
    private readonly userRepo: Repository<User>,
    @InjectDataSource('user_connection')
    private dataSource: DataSource
  ) { }


  async addNumbers(numOne: number, numTwo: number) {
    return numOne + numTwo
  }


  async getById(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    return user
  }
  async findAll(): Promise<User[]> {
    const allUser = await this.userRepo.find();
    return allUser
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {

    const { nome } = createUserDto;
    //Instancia a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    //Try Catch da transaction
    try {
      //Cria o objeto
      const generateNewUser = new User(
        nome
      );
      //salva
      const createdUser = await queryRunner.manager.save(
        User,
        generateNewUser,
      );
      //Comita
      await queryRunner.commitTransaction();

  /*     return {
        ...createdUser,
        //Esse undefined não retorna o password

      }; */
      return {
        ...createdUser,
        //Esse undefined não retorna o password

      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
