import { SeederFactoryManager, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import UserEntity, { Permissions } from '../entities/User.Entity';

export default class UserSeed implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManger: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);

    await repository.insert([
      {
        name: 'AdminRoot',
        comments: 'Primeiro Admin',
        birthday: '2000-12-26',
        cpf: '85807788087',
        password:
          '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
        permission: Permissions.ADMIN,
      },
    ]);

    const userFactory = factoryManger.get(UserEntity);

    await userFactory.save();
  }
}
