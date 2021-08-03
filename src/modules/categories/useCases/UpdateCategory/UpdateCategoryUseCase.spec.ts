import { AppError } from '@infra/http/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from '../CreateCategory/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let updateCategoryUseCase: UpdateCategoryUseCase;

describe('Update Category Use Case', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
    updateCategoryUseCase = new UpdateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to update a category', async () => {
    const category = await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    const response = await updateCategoryUseCase.execute({
      id: category.id,
      title: 'Category title update',
      color: 'Color update',
    });

    expect(response).toHaveProperty('title', 'Category title update');
  });

  it('should not be able to update a category with id that does not exist', async () => {
    await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    await expect(
      updateCategoryUseCase.execute({
        id: '28908',
        title: 'Category title update',
        color: 'Color update',
      }),
    ).rejects.toEqual(new AppError('Category does not exists!'));
  });
});
