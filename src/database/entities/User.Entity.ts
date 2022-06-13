import { Column, CreateDateColumn, Entity, Unique } from 'typeorm';
import Base from './Base';

export enum Permissions {
  ADMIN = 'ADMIN',
  COLAB = 'COLAB',
}
@Entity('user')
@Unique('UQ_CPF', ['cpf'])
export default class User extends Base {
  @Column({ length: 120 })
  name: string;

  @Column()
  @CreateDateColumn({ type: 'date' })
  birthday: string;

  @Column()
  cpf: string;

  @Column({ length: 500, nullable: true })
  comments: string;

  @Column({ length: 100 })
  password: string;

  @Column({ type: 'enum', enum: Permissions, default: Permissions.COLAB })
  permission: Permissions;
}
