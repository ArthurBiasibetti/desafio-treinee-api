import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../utils/apiError.utils';
import { verifyJwt } from '../utils/jwt.utils';

export interface ICustomRequest extends Request {
  auth?: {
    valid: boolean;
    expired: boolean;
    decoded: string | JwtPayload | null;
  };
}

const verifyAuth = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    throw new ApiError(401, true, 'Missing token to Authentication!');
  }

  const [, hash] = bearerHeader.split(' ');

  const auth = verifyJwt(hash);

  if (!auth.valid) {
    throw new ApiError(401, true, 'Authentication Failed!');
  }

  req.auth = auth;
  next();
};

export default verifyAuth;
