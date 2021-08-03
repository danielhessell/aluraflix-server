import { AppError } from '@infra/http/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from '../CreateCategory/CreateCategoryUseCase';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('Delete Category Use Case', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to delete a category', async () => {
    const category = await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    await deleteCategoryUseCase.execute({
      category_id: category.id,
    });

    const checkCategoryExists = await categoriesRepositoryInMemory.findById(
      category.id,
    );

    expect(checkCategoryExists).toBeUndefined();
  });

  it('should not be able to request the deletion of a category that does not exist', async () => {
    await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    await expect(
      deleteCategoryUseCase.execute({
        category_id: 'idthatnonexistent',
      }),
    ).rejects.toEqual(new AppError('Category does not exists!'));
  });
});
