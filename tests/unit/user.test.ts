import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  updateUser,
  verifyLogin,
} from '../../src/services/user.service';
import User, { Permissions } from '../../src/database/entities/User.Entity';
import dataSourceFake from '../fakes/dataSourceFake';
import AppError from '../../src/utils/AppError.utils';

describe('User Test', () => {
  describe('Create', () => {
    it('Should be able to create an user', async () => {
      const createStub = jest.fn((user) => ({ ...user, id: uuidV4() }));
      const saveStub = jest.fn();

      dataSourceFake.mockReturnValue({
        create: createStub,
        save: saveStub,
      } as unknown as Repository<User>);

      const userDummy = {
        name: 'testAdmin',
        birthday: '2000-26-12',
        cpf: '858.077.880-87',
        password: 'testPassword',
        permission: 'ADMIN',
      } as User;

      const user = await createUser(userDummy);

      expect(user).toHaveProperty('id');
      expect(createStub).toBeCalledTimes(1);
      expect(saveStub).toBeCalledTimes(1);
    });
  });
  describe('Find', () => {
    it('Should be able to find all users', async () => {
      const usersDummy = [
        {
          id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
          created_at: '2022-06-10T04:19:43.184Z',
          updated_at: '2022-06-10T04:19:43.184Z',
          name: 'AdminRoot',
          birthday: '2000-12-26',
          cpf: '85807788087',
          comments: '',
          password:
            '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
          permission: 'ADMIN',
        },
        {
          id: 'fffcadb7-c8e5-4d38-ac84-9c1dacaffa1d',
          created_at: '2022-06-10T10:29:53.718Z',
          updated_at: '2022-06-10T10:29:53.718Z',
          name: 'Claudio',
          birthday: '2022-06-30',
          cpf: '07075836080',
          comments: '',
          password:
            '$2b$10$vXv9VyBur2n1FKbaNgCBLuvW5aNawC9lfvbjXIRpbiYeDUtBXaVjm',
          permission: 'COLAB',
        },
        {
          id: 'dfbcd2d8-16ab-44e5-afdb-6798aac30de9',
          created_at: '2022-06-10T10:30:27.230Z',
          updated_at: '2022-06-10T10:30:27.230Z',
          name: 'Marcos',
          birthday: '2022-06-28',
          cpf: '65659217095',
          comments: '',
          password:
            '$2b$10$EwafbvVF89/KfBvV2PUFlOS4t6gJ9PxFnaEotkcd5qVA3.yzYSm3u',
          permission: 'COLAB',
        },
      ];
      const findStub = jest.fn(() => usersDummy);

      dataSourceFake.mockReturnValue({
        find: findStub,
      } as unknown as Repository<User>);

      const users = await findUsers();

      expect(users).toEqual(usersDummy);
    });

    it('Should be able to find an user', async () => {
      const usersDummy = [
        {
          id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
          created_at: '2022-06-10T04:19:43.184Z',
          updated_at: '2022-06-10T04:19:43.184Z',
          name: 'AdminRoot',
          birthday: '2000-12-26',
          cpf: '85807788087',
          comments: '',
          password:
            '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
          permission: 'ADMIN',
        },
        {
          id: 'fffcadb7-c8e5-4d38-ac84-9c1dacaffa1d',
          created_at: '2022-06-10T10:29:53.718Z',
          updated_at: '2022-06-10T10:29:53.718Z',
          name: 'Claudio',
          birthday: '2022-06-30',
          cpf: '07075836080',
          comments: '',
          password:
            '$2b$10$vXv9VyBur2n1FKbaNgCBLuvW5aNawC9lfvbjXIRpbiYeDUtBXaVjm',
          permission: 'COLAB',
        },
        {
          id: 'dfbcd2d8-16ab-44e5-afdb-6798aac30de9',
          created_at: '2022-06-10T10:30:27.230Z',
          updated_at: '2022-06-10T10:30:27.230Z',
          name: 'Marcos',
          birthday: '2022-06-28',
          cpf: '65659217095',
          comments: '',
          password:
            '$2b$10$EwafbvVF89/KfBvV2PUFlOS4t6gJ9PxFnaEotkcd5qVA3.yzYSm3u',
          permission: 'COLAB',
        },
      ];

      const findOneByStub = jest.fn(({ id }) =>
        usersDummy.find((user) => user.id === id)
      );

      dataSourceFake.mockReturnValue({
        findOneBy: findOneByStub,
      } as unknown as Repository<User>);

      const user = await findUser(usersDummy[2].id);

      expect(user).toEqual(usersDummy[2]);
      expect(findOneByStub).toBeCalledTimes(1);
    });
  });

  describe('Update', () => {
    it('Should be able to update an user', async () => {
      const usersDummy = [
        {
          id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
          created_at: '2022-06-10T04:19:43.184Z',
          updated_at: '2022-06-10T04:19:43.184Z',
          name: 'AdminRoot',
          birthday: '2000-12-26',
          cpf: '85807788087',
          comments: '',
          password:
            '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
          permission: 'ADMIN',
        },
        {
          id: 'fffcadb7-c8e5-4d38-ac84-9c1dacaffa1d',
          created_at: '2022-06-10T10:29:53.718Z',
          updated_at: '2022-06-10T10:29:53.718Z',
          name: 'Claudio',
          birthday: '2022-06-30',
          cpf: '07075836080',
          comments: '',
          password:
            '$2b$10$vXv9VyBur2n1FKbaNgCBLuvW5aNawC9lfvbjXIRpbiYeDUtBXaVjm',
          permission: 'COLAB',
        },
        {
          id: 'dfbcd2d8-16ab-44e5-afdb-6798aac30de9',
          created_at: '2022-06-10T10:30:27.230Z',
          updated_at: '2022-06-10T10:30:27.230Z',
          name: 'Marcos',
          birthday: '2022-06-28',
          cpf: '65659217095',
          comments: '',
          password:
            '$2b$10$EwafbvVF89/KfBvV2PUFlOS4t6gJ9PxFnaEotkcd5qVA3.yzYSm3u',
          permission: 'ADMIN',
        },
      ];

      const saveStub = jest.fn();
      const findOneByStub = jest.fn(({ id }) =>
        usersDummy.find((user) => user.id === id)
      );

      dataSourceFake.mockReturnValue({
        save: saveStub,
        findOneBy: findOneByStub,
      } as unknown as Repository<User>);

      const updatedUser1 = await updateUser(usersDummy[0].id, {
        comments: 'Comentado',
      });

      const updatedUser2 = await updateUser(usersDummy[1].id, {
        permission: Permissions.ADMIN,
      });

      const updatedUser3 = await updateUser(usersDummy[2].id, {
        comments: 'Comentado',
        permission: Permissions.COLAB,
      });

      expect(updatedUser1).toEqual({
        ...usersDummy[0],
        comments: 'Comentado',
      });

      expect(updatedUser2).toEqual({
        ...usersDummy[1],
        permission: Permissions.ADMIN,
      });

      expect(updatedUser3).toEqual({
        ...usersDummy[2],
        comments: 'Comentado',
        permission: Permissions.COLAB,
      });

      expect(saveStub).toBeCalledTimes(3);
      expect(findOneByStub).toBeCalledTimes(3);
    });

    it('Should not be able to update an user', async () => {
      const usersDummy = [
        {
          id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
          created_at: '2022-06-10T04:19:43.184Z',
          updated_at: '2022-06-10T04:19:43.184Z',
          name: 'AdminRoot',
          birthday: '2000-12-26',
          cpf: '85807788087',
          comments: '',
          password:
            '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
          permission: 'ADMIN',
        },
        {
          id: 'fffcadb7-c8e5-4d38-ac84-9c1dacaffa1d',
          created_at: '2022-06-10T10:29:53.718Z',
          updated_at: '2022-06-10T10:29:53.718Z',
          name: 'Claudio',
          birthday: '2022-06-30',
          cpf: '07075836080',
          comments: '',
          password:
            '$2b$10$vXv9VyBur2n1FKbaNgCBLuvW5aNawC9lfvbjXIRpbiYeDUtBXaVjm',
          permission: 'COLAB',
        },
        {
          id: 'dfbcd2d8-16ab-44e5-afdb-6798aac30de9',
          created_at: '2022-06-10T10:30:27.230Z',
          updated_at: '2022-06-10T10:30:27.230Z',
          name: 'Marcos',
          birthday: '2022-06-28',
          cpf: '65659217095',
          comments: '',
          password:
            '$2b$10$EwafbvVF89/KfBvV2PUFlOS4t6gJ9PxFnaEotkcd5qVA3.yzYSm3u',
          permission: 'ADMIN',
        },
      ];

      const saveStub = jest.fn();
      const findOneByStub = jest.fn(({ id }) =>
        usersDummy.find((user) => user.id === id)
      );

      dataSourceFake.mockReturnValue({
        save: saveStub,
        findOneBy: findOneByStub,
      } as unknown as Repository<User>);

      await expect(
        updateUser('not-an-user', {
          comments: 'Comentado',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updateUser('not-an-user', {
          comments: 'Comentado',
        })
      ).rejects.toThrowError('User not found!');
    });
  });

  describe('Delete', () => {
    it('Should be able to delete an user', async () => {
      const usersDummy = [
        {
          id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
          created_at: '2022-06-10T04:19:43.184Z',
          updated_at: '2022-06-10T04:19:43.184Z',
          name: 'AdminRoot',
          birthday: '2000-12-26',
          cpf: '85807788087',
          comments: '',
          password:
            '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
          permission: 'ADMIN',
        },
        {
          id: 'fffcadb7-c8e5-4d38-ac84-9c1dacaffa1d',
          created_at: '2022-06-10T10:29:53.718Z',
          updated_at: '2022-06-10T10:29:53.718Z',
          name: 'Claudio',
          birthday: '2022-06-30',
          cpf: '07075836080',
          comments: '',
          password:
            '$2b$10$vXv9VyBur2n1FKbaNgCBLuvW5aNawC9lfvbjXIRpbiYeDUtBXaVjm',
          permission: 'COLAB',
        },
        {
          id: 'dfbcd2d8-16ab-44e5-afdb-6798aac30de9',
          created_at: '2022-06-10T10:30:27.230Z',
          updated_at: '2022-06-10T10:30:27.230Z',
          name: 'Marcos',
          birthday: '2022-06-28',
          cpf: '65659217095',
          comments: '',
          password:
            '$2b$10$EwafbvVF89/KfBvV2PUFlOS4t6gJ9PxFnaEotkcd5qVA3.yzYSm3u',
          permission: 'ADMIN',
        },
      ];

      const removeStub = jest.fn((deletedUser) =>
        usersDummy.splice(
          usersDummy.findIndex((user) => user.id === deletedUser.id),
          1
        )
      );
      const findOneByStub = jest.fn(({ id }) =>
        usersDummy.find((user) => user.id === id)
      );

      dataSourceFake.mockReturnValue({
        remove: removeStub,
        findOneBy: findOneByStub,
      } as unknown as Repository<User>);

      await deleteUser(usersDummy[1].id);

      expect(usersDummy.length).toBe(2);
    });

    it('Should not be able to delete an user', async () => {
      const usersDummy = [
        {
          id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
          created_at: '2022-06-10T04:19:43.184Z',
          updated_at: '2022-06-10T04:19:43.184Z',
          name: 'AdminRoot',
          birthday: '2000-12-26',
          cpf: '85807788087',
          comments: '',
          password:
            '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
          permission: 'ADMIN',
        },
        {
          id: 'fffcadb7-c8e5-4d38-ac84-9c1dacaffa1d',
          created_at: '2022-06-10T10:29:53.718Z',
          updated_at: '2022-06-10T10:29:53.718Z',
          name: 'Claudio',
          birthday: '2022-06-30',
          cpf: '07075836080',
          comments: '',
          password:
            '$2b$10$vXv9VyBur2n1FKbaNgCBLuvW5aNawC9lfvbjXIRpbiYeDUtBXaVjm',
          permission: 'COLAB',
        },
        {
          id: 'dfbcd2d8-16ab-44e5-afdb-6798aac30de9',
          created_at: '2022-06-10T10:30:27.230Z',
          updated_at: '2022-06-10T10:30:27.230Z',
          name: 'Marcos',
          birthday: '2022-06-28',
          cpf: '65659217095',
          comments: '',
          password:
            '$2b$10$EwafbvVF89/KfBvV2PUFlOS4t6gJ9PxFnaEotkcd5qVA3.yzYSm3u',
          permission: 'ADMIN',
        },
      ];

      const removeStub = jest.fn((deletedUser) =>
        usersDummy.splice(
          usersDummy.findIndex((user) => user.id === deletedUser.id),
          1
        )
      );
      const findOneByStub = jest.fn(({ id }) =>
        usersDummy.find((user) => user.id === id)
      );

      dataSourceFake.mockReturnValue({
        remove: removeStub,
        findOneBy: findOneByStub,
      } as unknown as Repository<User>);

      await expect(deleteUser('not-an-user')).rejects.toBeInstanceOf(AppError);

      await expect(deleteUser('not-an-user')).rejects.toThrowError(
        'User not found!'
      );
    });
  });

  describe('Verify Login', () => {
    it('Should be able to validate a login', async () => {
      const usersDummy = [
        {
          id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
          created_at: '2022-06-10T04:19:43.184Z',
          updated_at: '2022-06-10T04:19:43.184Z',
          name: 'AdminRoot',
          birthday: '2000-12-26',
          cpf: '85807788087',
          comments: '',
          password:
            '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
          permission: 'ADMIN',
        },
        {
          id: 'fffcadb7-c8e5-4d38-ac84-9c1dacaffa1d',
          created_at: '2022-06-10T10:29:53.718Z',
          updated_at: '2022-06-10T10:29:53.718Z',
          name: 'Claudio',
          birthday: '2022-06-30',
          cpf: '07075836080',
          comments: '',
          password:
            '$2b$10$vXv9VyBur2n1FKbaNgCBLuvW5aNawC9lfvbjXIRpbiYeDUtBXaVjm',
          permission: 'COLAB',
        },
        {
          id: 'dfbcd2d8-16ab-44e5-afdb-6798aac30de9',
          created_at: '2022-06-10T10:30:27.230Z',
          updated_at: '2022-06-10T10:30:27.230Z',
          name: 'Marcos',
          birthday: '2022-06-28',
          cpf: '65659217095',
          comments: '',
          password:
            '$2b$10$EwafbvVF89/KfBvV2PUFlOS4t6gJ9PxFnaEotkcd5qVA3.yzYSm3u',
          permission: 'ADMIN',
        },
      ];

      const findOneByStub = jest.fn(
        ({ cpf, name }: { name?: string; cpf?: string }) => {
          let findedUser = usersDummy.find((user) => user.cpf === cpf);

          if (!findedUser) {
            findedUser = usersDummy.find((user) => user.name === name);
          }

          return findedUser;
        }
      );

      dataSourceFake.mockReturnValue({
        findOneBy: findOneByStub,
      } as unknown as Repository<User>);

      const user = await verifyLogin({
        username: usersDummy[0].cpf,
        password: 'rootadmin',
      });

      expect(user).toEqual(usersDummy[0]);
    });

    it('Should not be able to verifyLogin', async () => {
      const usersDummy = [
        {
          id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
          created_at: '2022-06-10T04:19:43.184Z',
          updated_at: '2022-06-10T04:19:43.184Z',
          name: 'AdminRoot',
          birthday: '2000-12-26',
          cpf: '85807788087',
          comments: '',
          password:
            '$2b$10$EDhGro0dCGtYTUApgaf3Tua9XQFtN6wSWsLOpvj8SRtYk9gPIpgYK',
          permission: 'ADMIN',
        },
        {
          id: 'fffcadb7-c8e5-4d38-ac84-9c1dacaffa1d',
          created_at: '2022-06-10T10:29:53.718Z',
          updated_at: '2022-06-10T10:29:53.718Z',
          name: 'Claudio',
          birthday: '2022-06-30',
          cpf: '07075836080',
          comments: '',
          password:
            '$2b$10$vXv9VyBur2n1FKbaNgCBLuvW5aNawC9lfvbjXIRpbiYeDUtBXaVjm',
          permission: 'COLAB',
        },
        {
          id: 'dfbcd2d8-16ab-44e5-afdb-6798aac30de9',
          created_at: '2022-06-10T10:30:27.230Z',
          updated_at: '2022-06-10T10:30:27.230Z',
          name: 'Marcos',
          birthday: '2022-06-28',
          cpf: '65659217095',
          comments: '',
          password:
            '$2b$10$EwafbvVF89/KfBvV2PUFlOS4t6gJ9PxFnaEotkcd5qVA3.yzYSm3u',
          permission: 'ADMIN',
        },
      ];

      const findOneByStub = jest.fn(
        ({ cpf, name }: { name?: string; cpf?: string }) => {
          let findedUser = usersDummy.find((user) => user.cpf === cpf);

          if (!findedUser) {
            findedUser = usersDummy.find((user) => user.name === name);
          }

          return findedUser;
        }
      );

      dataSourceFake.mockReturnValue({
        findOneBy: findOneByStub,
      } as unknown as Repository<User>);

      await expect(
        verifyLogin({ username: 'not-an-username', password: 'not-a-password' })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        verifyLogin({ username: 'not-an-username', password: 'not-a-password' })
      ).rejects.toThrowError('User not found!');

      await expect(
        verifyLogin({ username: usersDummy[0].cpf, password: 'not-a-password' })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        verifyLogin({ username: usersDummy[0].cpf, password: 'not-a-password' })
      ).rejects.toThrowError('Invalid Password!');
    });
  });
});
