import { AppError } from '@infra/http/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category Use Case', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with a title already created', async () => {
    await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    await expect(
      createCategoryUseCase.execute({
        title: 'Category title',
        color: 'Color',
      }),
    ).rejects.toEqual(new AppError('Category already exists!'));
  });
});
