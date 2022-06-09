import { DataSource, DataSourceOptions } from 'typeorm';
import config from '../config/config';

// import UserEntity from './entities/User.Entity';

const ormOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.postgresDb.host,
  port: config.postgresDb.port,
  username: config.postgresDb.username,
  password: config.postgresDb.password,
  database: config.postgresDb.database,
  logger: 'advanced-console',
  logging: false,
  synchronize: false,
  entities: [`${__dirname}/entities/*.Entity.ts`],
  migrations: [`${__dirname}/migrations/*`],
};

const dataSource: DataSource = new DataSource(ormOptions);

export default dataSource;
