import { AppError } from '@infra/http/errors/AppError';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({ title, color }: ICreateCategoryDTO): Promise<ICategoryDTO> {
    const categoryAlreadyExists = await this.categoriesRepository.findByTitle(
      title,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!');
    }

    const category = await this.categoriesRepository.create({
      title,
      color,
    });

    return category;
  }
}
