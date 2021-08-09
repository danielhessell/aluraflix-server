/* eslint-disable no-param-reassign */
import { AppError } from '@infra/http/errors/AppError';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  page: number;
  title?: string;
}

@injectable()
export class ListUserVideosUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) { }

  async execute({ user_id, page, title }: IRequest): Promise<IVideoDTO[]> {
    if (title) {
      const videosByTitle = await this.videosRepository.findByTitleAndUser(
        user_id,
        title,
      );

      if (!videosByTitle) {
        throw new AppError('No videos with this title were found.');
      }

      return videosByTitle;
    }

    if (!page) page = 1;

    // All with Pagination
    const videos = await this.videosRepository.findAllByUser(user_id, page);

    return videos;
  }
}
