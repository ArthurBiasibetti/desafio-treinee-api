import { Response, NextFunction, Request } from 'express';
import DataSource from '../database/data.source';
import User from '../database/entities/User.Entity';
import ApiError from '../utils/apiError.utils';

const onlyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  const userRepository = DataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (user?.permission !== 'ADMIN') {
    throw new ApiError(403, true, 'Only admin can use this command');
  }

  next();
};

export default onlyAdmin;
