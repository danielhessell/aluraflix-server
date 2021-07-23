import { AppError } from '@infra/http/errors/AppError';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  video_id: string;
}

@injectable()
export class DeleteVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) { }

  async execute({ video_id }: IRequest): Promise<void> {
    const checkVideoExists = await this.videosRepository.findById(video_id);

    if (!checkVideoExists) {
      throw new AppError('Video does not exists!');
    }

    await this.videosRepository.delete(video_id);
  }
}
