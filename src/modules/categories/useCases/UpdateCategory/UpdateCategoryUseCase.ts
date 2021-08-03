import { AppError } from '@infra/http/errors/AppError';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import { IUpdateCategoryDTO } from '@modules/categories/dtos/IUpdateCategoryDTO';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({
    id,
    title,
    color,
  }: IUpdateCategoryDTO): Promise<ICategoryDTO> {
    const checkCategoryExists = await this.categoriesRepository.findById(id);

    if (!checkCategoryExists) {
      throw new AppError('Category does not exists!');
    }

    const category = await this.categoriesRepository.update({
      id,
      title,
      color,
    });

    return category;
  }
}
