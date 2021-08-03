import { AppError } from '@infra/http/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from '../CreateCategory/CreateCategoryUseCase';
import { SearchCategoriesUseCase } from './SearchCategoriesUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let searchCategoriesUseCase: SearchCategoriesUseCase;

describe('Search Categories Use Case', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
    searchCategoriesUseCase = new SearchCategoriesUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to list all categories', async () => {
    await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    await createCategoryUseCase.execute({
      title: 'Category title2',
      color: 'Color2',
    });

    const categories = await searchCategoriesUseCase.execute({});

    expect(categories).toHaveLength(2);
  });

  it('should be able to search a category by id', async () => {
    const category = await createCategoryUseCase.execute({
      title: 'Category title',
      color: 'Color',
    });

    await createCategoryUseCase.execute({
      title: 'Category title2',
      color: 'Color2',
    });

    const response = await searchCategoriesUseCase.execute({
      category_id: category.id,
    });

    expect(response).toHaveProperty('id', category.id);
  });

  it('should not be able to search a category with id that does not exist', async () => {
    await createCategoryUseCase.execute({
      title: 'Category title2',
      color: 'Color2',
    });

    await expect(
      searchCategoriesUseCase.execute({
        category_id: '33264',
      }),
    ).rejects.toEqual(new AppError('Category does not exists!'));
  });
});
