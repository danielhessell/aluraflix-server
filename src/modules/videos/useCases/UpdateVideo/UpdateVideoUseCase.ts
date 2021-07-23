import { AppError } from '@infra/http/errors/AppError';
import { IUpdateVideoDTO } from '@modules/videos/dtos/IUpdateVideoDTO';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) { }

  async execute({
    id,
    title,
    description,
    url,
  }: IUpdateVideoDTO): Promise<IVideoDTO> {
    const checkVideoExists = await this.videosRepository.findById(id);

    if (!checkVideoExists) {
      throw new AppError('Video does not exists!');
    }

    const video = await this.videosRepository.update({
      id,
      title,
      description,
      url,
    });

    return video;
  }
}
