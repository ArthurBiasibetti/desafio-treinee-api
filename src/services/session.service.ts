import config from '../config/config';
import { signJWT } from '../utils/jwt.utils';
import { verifyLogin } from './user.service';

export const createSession = async (login: {
  username?: string;
  password: string;
}) => {
  const user = await verifyLogin(login);

  const payload = { id: user.id };

  const token = signJWT(payload, { expiresIn: config.accessTokenTtl });

  return { token, user };
};
