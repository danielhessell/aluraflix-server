import { AppError } from '@infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';

import { CreateVideoUseCase } from '../CreateVideo/CreateVideoUseCase';
import { ListUserVideosUseCase } from './ListUserVideoUseCase';

let videosRepositoryInMemory: VideosRepositoryInMemory;
let listUserVideosUseCase: ListUserVideosUseCase;
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
    listUserVideosUseCase = new ListUserVideosUseCase(videosRepositoryInMemory);
  });

  it('should be able to list all videos of a user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '12345',
    });

    const user2 = await createUserUseCase.execute({
      name: 'Bernard Dunn',
      email: 'bernarddunn@example.com',
      password: '63793',
    });

    await createVideoUseCase.execute({
      user_id: user2.id,
      title: 'Title example',
      description: 'Description example',
      url: 'http://localhost:3333',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example2',
      description: 'Description example2',
      url: 'http://localhost:3333',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example3',
      description: 'Description example3',
      url: 'http://localhost:3333',
    });

    const videos = await listUserVideosUseCase.execute({
      user_id: user.id,
      page: 1,
    });

    expect(videos).toHaveLength(2);
  });

  it('should be able to search a video by title', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '63793',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      title: 'Title example',
      description: 'Description example',
      url: 'http://localhost:3333',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      title: 'DifferentTitle',
      description: 'Description example2',
      url: 'http://localhost:3333',
    });

    const response = await listUserVideosUseCase.execute({
      user_id: user.id,
      title: 'DifferentTitle',
      page: 1,
    });

    expect(response).toHaveLength(1);
  });

  it('should not be able to to search a video by title nonexistent', async () => {
    const user = await createUserUseCase.execute({
      name: 'Loretta Greer',
      email: 'lorettagreer@example.com',
      password: '63793',
    });

    expect(
      listUserVideosUseCase.execute({
        user_id: user.id,
        title: 'Title nonexistent',
        page: 1,
      }),
    ).rejects.toEqual(new AppError('No videos with this title were found.'));
  });
});
