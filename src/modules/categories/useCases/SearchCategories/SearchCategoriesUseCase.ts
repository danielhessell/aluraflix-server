import { AppError } from '@infra/http/errors/AppError';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  category_id?: string;
}

@injectable()
export class SearchCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({
    category_id,
  }: IRequest): Promise<ICategoryDTO[] | ICategoryDTO> {
    if (category_id) {
      const category = await this.categoriesRepository.findById(category_id);

      if (!category) {
        throw new AppError('Category does not exists!');
      }

      return category;
    }

    const categories = await this.categoriesRepository.listAll();

    return categories;
  }
}
