import { prisma } from '@infra/prisma/client';
import { ICreateVideoDTO } from '@modules/videos/dtos/ICreateVideoDTO';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';

import { IVideosRepository } from '../IVideosRepository';

export class VideosRepository implements IVideosRepository {
  private repository = prisma.video;

  async create({
    user_id,
    title,
    description,
    url,
  }: ICreateVideoDTO): Promise<IVideoDTO> {
    const video = await this.repository.create({
      data: {
        user_id,
        title,
        description,
        url,
      },
    });

    return video;
  }

  async findById(video_id: string): Promise<IVideoDTO> {
    const video = await this.repository.findUnique({
      where: { id: video_id },
    });

    return video;
  }

  async findAllByUser(user_id: string): Promise<IVideoDTO[]> {
    const videos = await this.repository.findMany({
      where: { user_id },
    });

    return videos;
  }
}
