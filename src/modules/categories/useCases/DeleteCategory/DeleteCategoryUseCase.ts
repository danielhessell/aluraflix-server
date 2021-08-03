import { AppError } from '@infra/http/errors/AppError';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  category_id: string;
}

@injectable()
export class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({ category_id }: IRequest): Promise<void> {
    const checkCategoryExists = await this.categoriesRepository.findById(
      category_id,
    );

    if (!checkCategoryExists) {
      throw new AppError('Category does not exists!');
    }

    await this.categoriesRepository.delete(category_id);
  }
}
