import { AppError } from '@infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';

import { CreateVideoUseCase } from '../CreateVideo/CreateVideoUseCase';
import { UpdateVideoUseCase } from './UpdateVideoUseCase';

let videosRepositoryInMemory: VideosRepositoryInMemory;
let updateVideoUseCase: UpdateVideoUseCase;
let createVideoUseCase: CreateVideoUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('List User Videos Use Case', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createVideoUseCase = new CreateVideoUseCase(
      videosRepositoryInMemory,
      categoriesRepositoryInMemory,
    );
    updateVideoUseCase = new UpdateVideoUseCase(videosRepositoryInMemory);
  });

  it('should be able to update a video', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '12345',
    });

    const video = await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example',
      description: 'Description example',
      url: 'http://localhost:3333',
    });

    const response = await updateVideoUseCase.execute({
      id: video.id,
      title: 'Title Updated',
      description: 'Description updated',
      url: 'Description updated',
    });

    expect(response).toHaveProperty('id', video.id);
    expect(response).toHaveProperty('title', 'Title Updated');
    expect(response).toHaveProperty('description', 'Description updated');
    expect(response).toHaveProperty('url', 'Description updated');
  });

  it('should not be able to update a video nonexistent', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '12345',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example',
      description: 'Description example',
      url: 'http://localhost:3333',
    });

    await expect(
      updateVideoUseCase.execute({
        id: 'video.id',
        title: 'Title Updated',
        description: 'Description updated',
        url: 'Description updated',
      }),
    ).rejects.toEqual(new AppError('Video does not exists!'));
  });
});
