import bcrypt from 'bcrypt';
import DataSource from '../database/data.source';
import UserEntity from '../database/entities/User.Entity';
import { IUserInput } from '../models/user.model';
import config from '../config/config';

export async function createUser(input: IUserInput) {
  const repository = DataSource.getRepository(UserEntity);

  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hashedPassword = await bcrypt.hash(input.password, salt);

  const newProduct = repository.create({ ...input, password: hashedPassword });

  await repository.save(newProduct);

  return newProduct;
}

export async function findUsers() {
  const repository = DataSource.getRepository(UserEntity);
  const newProduct = repository.find();

  return newProduct;
}

export async function findUser(userId: string) {
  const repository = DataSource.getRepository(UserEntity);
  const newProduct = repository.findOneBy({ id: userId });

  return newProduct;
}

export async function updateUser(
  userId: string,
  updateInput: Pick<IUserInput, 'comments' | 'permission'>
) {
  const repository = DataSource.getRepository(UserEntity);
  const user = await repository.findOneBy({ id: userId });

  const updatedUser = {
    ...user,
    comments: updateInput.comments || user?.comments,
    permission: updateInput.permission || user?.permission,
  };

  await repository.save(updatedUser);

  return updatedUser;
}
