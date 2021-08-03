import { AppError } from '@infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';
import { CreateVideoUseCase } from '@modules/videos/useCases/CreateVideo/CreateVideoUseCase';

import { CreateCategoryUseCase } from '../CreateCategory/CreateCategoryUseCase';
import { SearchVideoByCategoryUseCase } from './SearchVideoByCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let searchVideoByCategoryUseCase: SearchVideoByCategoryUseCase;
let createCategoryUseCase: CreateCategoryUseCase;

let videosRepositoryInMemory: VideosRepositoryInMemory;
let createVideoUseCase: CreateVideoUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Search Video By Category Use Case', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createVideoUseCase = new CreateVideoUseCase(
      videosRepositoryInMemory,
      categoriesRepositoryInMemory,
    );
    searchVideoByCategoryUseCase = new SearchVideoByCategoryUseCase(
      categoriesRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to search a video by category id', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alberta Hunter',
      email: 'albertahunter@example.com',
      password: '32550',
    });

    const category = await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      category_id: category.id,
      title: 'Video title',
      description: 'Video description',
      url: 'Video url',
    });

    const response = await searchVideoByCategoryUseCase.execute({
      category_id: category.id,
    });

    expect(response).toHaveProperty('id', category.id);
  });

  it('should not be able to search a video by category with id that does not exist', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alberta Hunter',
      email: 'albertahunter@example.com',
      password: '32550',
    });

    const category = await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    await createVideoUseCase.execute({
      user_id: user.id,
      category_id: category.id,
      title: 'Video title',
      description: 'Video description',
      url: 'Video url',
    });

    await expect(
      searchVideoByCategoryUseCase.execute({
        category_id: '17305',
      }),
    ).rejects.toEqual(new AppError('Category does not exists!'));
  });
});
