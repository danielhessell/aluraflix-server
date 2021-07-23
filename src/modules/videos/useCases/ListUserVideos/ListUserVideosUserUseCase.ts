import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
export class ListUserVideosUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) { }

  async execute({ user_id }: IRequest): Promise<IVideoDTO[]> {
    const videos = await this.videosRepository.findAllByUser(user_id);

    return videos;
  }
}
