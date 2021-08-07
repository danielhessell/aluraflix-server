import { app } from '@infra/http/app';
import { prisma } from '@infra/prisma/client';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import request from 'supertest';

let user: IUserDTO;
let token: string;
let category: ICategoryDTO;

describe('Search videos by category controller flow', () => {
  beforeAll(async () => {
    const { body } = await request(app).post('/users').send({
      name: 'Edwin Hardy',
      email: 'edwinhardy@gmail.com',
      password: '1234',
    });

    user = body;

    const authResponse = await request(app).post('/sessions').send({
      email: user.email,
      password: '1234',
    });

    token = authResponse.body.token;

    const categoryResponse = await request(app)
      .post('/categories')
      .send({
        title: 'Integration tests',
        color: 'color',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    category = categoryResponse.body;
  });

  afterAll(async () => {
    await prisma.category.delete({ where: { id: category.id } });
    await prisma.user.delete({ where: { id: user.id } });
  });

  it('should be able to update a category', async () => {
    const response = await request(app)
      .put(`/categories/${category.id}`)
      .send({
        color: 'Updated color',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('color', 'Updated color');
  });
});
