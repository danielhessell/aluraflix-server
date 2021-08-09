import { app } from '@infra/http/app';
import { prisma } from '@infra/prisma/client';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import request from 'supertest';

let user: IUserDTO;
let token: string;
let video: IVideoDTO;
let category: ICategoryDTO;

describe('List user videos controller flow', () => {
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
        title: 'Category title',
        color: 'green',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    category = categoryResponse.body;

    const videoResponse = await request(app)
      .post('/videos')
      .send({
        category_id: category.id,
        title: 'Example title',
        description: 'Example description',
        url: 'http://localhost:example/video-example',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    video = videoResponse.body;
  });

  afterAll(async () => {
    await prisma.video.delete({ where: { id: video.id } });
    await prisma.category.delete({ where: { id: category.id } });
    await prisma.user.delete({ where: { id: user.id } });
  });

  it('should be able to list user videos', async () => {
    const response = await request(app)
      .get('/videos')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
