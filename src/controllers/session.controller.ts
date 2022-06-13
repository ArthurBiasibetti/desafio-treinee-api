import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateSessionInput } from '../schemas/session.schema';
import { createSession } from '../services/session.service';

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput['body']>,
  res: Response
) {
  const { body } = req;

  const sessionData = await createSession({ ...body });

  res.set('authorization', sessionData.token);
  return res.status(StatusCodes.ACCEPTED).json(sessionData.user);
}
