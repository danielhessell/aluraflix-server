import { AppError } from '@infra/http/errors/AppError';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { ICreateVideoDTO } from '@modules/videos/dtos/ICreateVideoDTO';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({
    user_id,
    category_id,
    title,
    description,
    url,
  }: ICreateVideoDTO): Promise<IVideoDTO> {
    if (category_id) {
      const checkCategoryExists = await this.categoriesRepository.findById(
        category_id,
      );

      if (!checkCategoryExists) {
        throw new AppError('Category does not exists!');
      }
    }

    const video = await this.videosRepository.create({
      user_id,
      category_id: !category_id ? '1' : category_id,
      title,
      description,
      url,
    });

    return video;
  }
}
