import { app } from '@infra/http/app';
import { prisma } from '@infra/prisma/client';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import request from 'supertest';

let user: IUserDTO;

describe('Users controller flow', () => {
  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Mary Walker',
      email: 'marywalker@gmail.com',
      password: '1234',
    });

    user = response.body;

    expect(response.status).toBe(201);
  });

  it('should not be able to create a user with exists email', async () => {
    const response = await request(app).post('/users').send({
      name: 'Mary Walker',
      email: 'marywalker@gmail.com',
      password: '1234',
    });

    expect(response.status).toBe(400);
  });
});
