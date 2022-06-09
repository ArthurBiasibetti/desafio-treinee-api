import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  CreateUserInput,
  ReadUserInput,
  UpdateUserInput,
} from '../schemas/user.schema';

import {
  createUser,
  findUser,
  findUsers,
  updateUser,
} from '../services/user.service';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  const { body } = req;

  const user = await createUser({ ...body });

  return res.status(StatusCodes.CREATED).json(user);
}

export async function findUserHandler(
  req: Request<ReadUserInput['params'], {}, {}>,
  res: Response
) {
  const { params } = req;

  const user = await findUser(params.userId);

  return res.status(StatusCodes.OK).json(user);
}

export async function findUsersHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  const users = await findUsers();

  return res.status(StatusCodes.OK).json(users);
}

export async function updateUserHandler(
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  res: Response
) {
  const { params, body } = req;

  const updatedUser = await updateUser(params.userId, body);

  return res.status(StatusCodes.OK).json(updatedUser);
}
