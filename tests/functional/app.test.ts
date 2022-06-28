import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import { Permissions } from '../../src/database/entities/User.Entity';

const app = 'http://localhost:3001/';

let authToken: string;
let userId: string;

describe('Auth', () => {
  const username = 'AdminRoot';
  const userNameCPF = 'AdminRoot';
  const password = 'rootadmin';

  it('Should singin with name', async () => {
    const response = await supertest(app).post('api/v1/sessions').send({
      username,
      password,
    });

    expect(response.status).toBe(StatusCodes.ACCEPTED);
    expect(response.headers).toHaveProperty('authorization');
  });

  it('Should singin with cpf', async () => {
    const response = await supertest(app).post('api/v1/sessions').send({
      username: userNameCPF,
      password,
    });

    expect(response.status).toBe(StatusCodes.ACCEPTED);
    expect(response.headers).toHaveProperty('authorization');

    authToken = response.headers.authorization;
  });
});

describe('Users', () => {
  const newUserDummy = {
    birthday: '1996-04-02',
    cpf: '12918592099',
    comments: '',
    name: 'Henrique Farias',
    permission: Permissions.ADMIN,
    password: '123',
  };

  it('Should post /users', async () => {
    const response = await supertest(app)
      .post('api/v1/users')
      .auth(authToken, { type: 'bearer' })
      .send(newUserDummy);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toHaveProperty('id');

    userId = response.body.id;
  });

  it('Should get /users', async () => {
    const response = await supertest(app)
      .get(`api/v1/users`)
      .auth(authToken, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
  });

  it('Should get /users/:id', async () => {
    const response = await supertest(app)
      .get(`api/v1/users/${userId}`)
      .auth(authToken, { type: 'bearer' });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(userId);
    expect(response.status).toBe(StatusCodes.OK);
  });

  it(`Should put /users/:id`, async () => {
    const response = await supertest(app)
      .put(`api/v1/users/${userId}`)
      .auth(authToken, { type: 'bearer' })
      .send({ permission: Permissions.COLAB });

    expect(response.status).toBe(StatusCodes.OK);

    const response2 = await supertest(app)
      .get(`api/v1/users/${userId}`)
      .auth(authToken, { type: 'bearer' });

    expect(response2.body.permission).toBe(Permissions.COLAB);
  });

  it('Should delete /users/:id', async () => {
    const response = await supertest(app)
      .delete(`api/v1/users/${userId}`)
      .auth(authToken, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });
});
