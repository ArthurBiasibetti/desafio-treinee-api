import { createSession } from '../../src/services/session.service';
import User from '../../src/database/entities/User.Entity';

import verifyLoginFake from '../fakes/verifyLoginFake';

describe('Session Test', () => {
  describe('Login test', () => {
    it('Should be able to login', async () => {
      // Não consegui fazer chamar o spyOn no lugar do method original.
      verifyLoginFake.mockReturnValue({
        id: 'ffa63d91-7f26-473f-ad10-00e812c65afb',
      } as unknown as Promise<User>);

      const session = await createSession({
        password: 'rootadmin',
        username: 'AdminRoot',
      });

      expect(session).toHaveProperty('token');
      expect(session).toHaveProperty('user');
      expect(verifyLoginFake).toHaveBeenCalledTimes(1);
    });
  });
});
