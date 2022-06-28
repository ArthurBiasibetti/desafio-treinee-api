import bcrypt from 'bcrypt';
import DataSource from '../database/data-source';
import UserEntity, { Permissions } from '../database/entities/User.Entity';
import { IUserInput } from '../models/user.model';
import config from '../config/config';
import AppError from '../utils/AppError.utils';

export async function createUser(input: IUserInput) {
  const repository = DataSource.getRepository(UserEntity);

  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hashedPassword = await bcrypt.hash(input.password, salt);

  const newUser = repository.create({ ...input, password: hashedPassword });

  await repository.save(newUser);

  return newUser;
}

export async function findUsers() {
  const repository = DataSource.getRepository(UserEntity);
  const users = repository.find();

  return users;
}

export async function findUser(userId: string) {
  const repository = DataSource.getRepository(UserEntity);
  const user = repository.findOneBy({ id: userId });

  return user;
}

export async function updateUser(
  userId: string,
  updateInput: { comments?: string; permission?: Permissions }
) {
  const repository = DataSource.getRepository(UserEntity);
  const user = await repository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError('User not found!');
  }

  const updatedUser = {
    ...user,
    comments: updateInput.comments || user?.comments,
    permission: updateInput.permission || user?.permission,
  };

  await repository.save(updatedUser);

  return updatedUser;
}

export async function verifyLogin(login: {
  username?: string;
  password: string;
}) {
  const repository = DataSource.getRepository(UserEntity);
  let user: UserEntity | null = null;

  user = await repository.findOneBy({ name: login.username });

  if (!user) {
    user = await repository.findOneBy({ cpf: login.username });
  }

  if (!user) {
    throw new AppError('User not found!', 404);
  }

  const passwordIsValid = await bcrypt.compare(login.password, user.password);

  if (!passwordIsValid) {
    throw new AppError('Invalid Password!', 406);
  }

  return user;
}

export async function deleteUser(userId: string) {
  const repository = DataSource.getRepository(UserEntity);

  const user = await repository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError('User not found!', 404);
  }

  await repository.remove(user);

  return true;
}
