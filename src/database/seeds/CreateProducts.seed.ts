import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import UserEntity, { Permissions } from '../entities/User.Entity';

export default class CreateProducts implements Seeder {
  public async run(_: Factory, connection: DataSource): Promise<any> {
    const rows = await connection.getRepository(UserEntity).count();
    if (rows <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values([
          {
            name: 'AdminRoot',
            comments: 'Primeiro Admin',
            birthday: '26/12/2000',
            cpf: '85807788087',
            password: 'rootadmin',
            permissions: Permissions.ADMIN,
          },
        ])
        .execute();
    }
  }
}
