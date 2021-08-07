import { AppError } from '@infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';

import { CreateVideoUseCase } from '../CreateVideo/CreateVideoUseCase';
import { SearchVideoUseCase } from './SearchVideoUseCase';

let videosRepositoryInMemory: VideosRepositoryInMemory;
let searchVideoUseCase: SearchVideoUseCase;
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
    searchVideoUseCase = new SearchVideoUseCase(videosRepositoryInMemory);
  });

  it('should be able to search a video by id', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '12345',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example2',
      description: 'Description example2',
      url: 'http://localhost:3333',
    });

    const video = await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example3',
      description: 'Description example3',
      url: 'http://localhost:3333',
    });

    const response = await searchVideoUseCase.execute({
      video_id: video.id,
    });

    expect(response).toHaveProperty('id', video.id);
  });

  it('should not be able to search a video by id nonexistent', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '12345',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example2',
      description: 'Description example2',
      url: 'http://localhost:3333',
    });

    const video = await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example3',
      description: 'Description example3',
      url: 'http://localhost:3333',
    });

    expect(
      searchVideoUseCase.execute({
        video_id: video.id,
      }),
    ).rejects.toEqual(new AppError('Video does not exists!'));
  });
});
