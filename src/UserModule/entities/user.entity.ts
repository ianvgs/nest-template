import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('user')
export class User {

  constructor(nome) {
    this.nome = nome;
  }


  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'nome' })
  nome: string;

  @CreateDateColumn()
  createdAt: Date;
}
