import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'user_connection')
    private readonly userRepo: Repository<User>,
  ) { }


  async cadastrarUser(props: Partial<User>): Promise<User> {
    const { nome } = props;
    const createdUser = this.userRepo.create({
      nome,
      createdAt: new Date(),

    });
    const savedCategoria = await this.userRepo.save(createdUser);
    return savedCategoria;
  }

}
