import { app } from '@infra/http/app';
import { prisma } from '@infra/prisma/client';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import request from 'supertest';

let user: IUserDTO;
let token: string;
let category: ICategoryDTO;

describe('Search categories controller flow', () => {
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

    const response = await request(app)
      .post('/categories')
      .send({
        title: 'Integration tests',
        color: 'color',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    category = response.body;
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.category.delete({ where: { id: category.id } });
  });

  it('should be able to list all categories', async () => {
    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should be able to search a category by id', async () => {
    const response = await request(app)
      .get(`/categories/${category.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', category.id);
    expect(response.body).toHaveProperty('title', category.title);
  });
});
