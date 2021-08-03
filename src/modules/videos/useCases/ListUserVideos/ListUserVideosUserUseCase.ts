import { AppError } from '@infra/http/errors/AppError';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  title?: string;
}

@injectable()
export class ListUserVideosUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) { }

  async execute({ user_id, title }: IRequest): Promise<IVideoDTO[]> {
    if (title) {
      const videosByTitle = await this.videosRepository.findByTitle(title);

      if (!videosByTitle) {
        throw new AppError('No videos with this name were found.');
      }

      return videosByTitle;
    }

    const videos = await this.videosRepository.findAllByUser(user_id);

    return videos;
  }
}
