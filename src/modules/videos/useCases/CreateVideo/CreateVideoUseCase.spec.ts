import { AppError } from '@infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';

import { CreateVideoUseCase } from './CreateVideoUseCase';

let videosRepositoryInMemory: VideosRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createVideoUseCase: CreateVideoUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create Video Use Case', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createVideoUseCase = new CreateVideoUseCase(
      videosRepositoryInMemory,
      categoriesRepositoryInMemory,
    );

    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new video', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '63793',
    });

    const video = await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example',
      description: 'Description example',
      url: 'http://localhost:3333',
    });

    expect(video).toHaveProperty('id');
  });

  it('should not be able to create a new video with a category that does not exist', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '63793',
    });

    await expect(
      createVideoUseCase.execute({
        user_id: user.id,
        category_id: '8765',
        title: 'Title example',
        description: 'Description example',
        url: 'http://localhost:3333',
      }),
    ).rejects.toEqual(new AppError('Category does not exists!'));
  });
});
