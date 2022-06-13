import dataSource from '../database/data-source';
import config from './config';
import logger from './logger';

async function database() {
  try {
    if (config.postgresDb.host) {
      await dataSource.initialize();
      logger.info('Postgres connected');
    }
  } catch (error) {
    logger.error('Could not connect to db');
    logger.error(error);
    process.exit(1);
  }
}

export default database;
