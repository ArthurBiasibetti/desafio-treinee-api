import { createSession } from '../../src/services/session.service';

import verifyLoginFake from '../fakes/verifyLoginFake';

describe('Session Test', () => {
  describe('Login test', () => {
    it('Should be able to login', async () => {
      // Não consegui fazer chamar o spyOn no lugar do method original.
      verifyLoginFake.mockImplementation(
        () =>
          console.log(
            'Não entra no spyOn para chamar no lugar do method original'
          ) as any
      );

      const session = await createSession({
        password: 'rootadmin',
        username: 'AdminRoot',
      });

      expect(session).toHaveProperty('token');
      expect(session).toHaveProperty('user');
    });
  });
});
