import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.utils';
import { verifyJwt } from '../utils/jwt.utils';

export interface ICustomRequest extends Request {
  userId: string;
}

const verifyAuth = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    throw new AppError('Missing token to Authentication!', 401);
  }

  const [, hash] = bearerHeader.split(' ');

  const auth = verifyJwt(hash);

  if (!auth.valid) {
    throw new AppError('Authentication Failed!', 401);
  }

  req.userId = (<{ id: string }>auth?.decoded).id;
  next();
};

export default verifyAuth;
