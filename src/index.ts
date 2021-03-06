import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import config, { environments } from './config/config';
import logger from './config/logger';
import database from './config/database';
import routes from './routes';
import swaggerDocs from './config/swagger';
import AppError from './utils/AppError.utils';

const app = express();

const corsOptions = {
  exposedHeaders: ['authorization'],
};

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.options('*', cors());

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  await database();

  routes(app);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        status: 'error',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal Server error',
    });

    next();
  });

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }
});

export default app;
