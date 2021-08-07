import { app } from '@infra/http/app';
import { prisma } from '@infra/prisma/client';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import request from 'supertest';

let user: IUserDTO;

describe('Authenticate user flow', () => {
  beforeAll(async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '1234',
    });

    user = response.body;
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
  });

  it('should be able to authenticate a user', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '1234',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
