import { User } from '../entities/user.entity';
import {
    IsEmail,
    IsNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    nome: string;
}



