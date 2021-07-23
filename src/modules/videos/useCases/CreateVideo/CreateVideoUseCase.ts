import { ICreateVideoDTO } from '@modules/videos/dtos/ICreateVideoDTO';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject } from 'tsyringe';

export class CreateVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) { }

  async execute({
    user_id,
    title,
    description,
    url,
  }: ICreateVideoDTO): Promise<IVideoDTO> {
    const video = await this.videosRepository.create({
      user_id,
      title,
      description,
      url,
    });

    return video;
  }
}
