import { app } from '@infra/http/app';
import { prisma } from '@infra/prisma/client';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import request from 'supertest';

let category: ICategoryDTO;
let token: string;
let user: IUserDTO;

describe('Delete category controller flow', () => {
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
  });

  it('should be able to delete a category', async () => {
    const response = await request(app)
      .delete(`/categories/${category.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Successfully deleted video!',
    );
  });
});
