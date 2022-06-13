import { Response, NextFunction } from 'express';
import DataSource from '../database/data-source';
import User from '../database/entities/User.Entity';
import AppError from '../utils/AppError.utils';
import { ICustomRequest } from './verifyJWT';

const onlyAdmin = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  const userRepository = DataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (user?.permission !== 'ADMIN') {
    throw new AppError('Only admin can use this command', 403);
  }

  next();
};

export default onlyAdmin;
