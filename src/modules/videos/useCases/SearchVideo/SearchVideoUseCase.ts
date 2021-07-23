import { AppError } from '@infra/http/errors/AppError';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  video_id: string;
}

@injectable()
export class SearchVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) { }

  async execute({ video_id }: IRequest): Promise<IVideoDTO> {
    const video = await this.videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Video not found!');
    }

    return video;
  }
}
