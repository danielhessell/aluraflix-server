import { AppError } from '@infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';

import { CreateVideoUseCase } from '../CreateVideo/CreateVideoUseCase';
import { DeleteVideoUseCase } from './DeleteVideoUseCase';

let videosRepositoryInMemory: VideosRepositoryInMemory;
let deleteVideoUseCase: DeleteVideoUseCase;
let createVideoUseCase: CreateVideoUseCase;

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Delete Video Use Case', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    deleteVideoUseCase = new DeleteVideoUseCase(videosRepositoryInMemory);

    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createVideoUseCase = new CreateVideoUseCase(
      videosRepositoryInMemory,
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to delete a video', async () => {
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

    await deleteVideoUseCase.execute({ video_id: video.id });

    const checkVideoExists = await videosRepositoryInMemory.findById(video.id);

    expect(checkVideoExists).toBeUndefined();
  });

  it('should not be able to request the deletion of a video that does not exist', async () => {
    await expect(
      deleteVideoUseCase.execute({ video_id: '17045' }),
    ).rejects.toEqual(new AppError('Video does not exists!'));
  });
});
