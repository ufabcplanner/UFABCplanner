import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createUser, getUserByEmail } from '../../../../test/entities/UserFactory';
import { generateRandomEmail } from '../../../../test/utils';

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });
  it('should authenticate user correctly', async () => {
    const user = await createUser();

    const response = await supertest(app).post('/users/login').send({
      email: user.email,
      password: '123',
    });

    expect(response.status).toBe(200);
  });
});
