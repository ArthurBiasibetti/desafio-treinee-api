import { Permissions } from '../database/entities/User.Entity';

export interface IUserInput {
  name: string;
  birthday: string;
  cpf: string;
  comments?: string;
  password: string;
  permission: Permissions.ADMIN | Permissions.COLAB;
}
