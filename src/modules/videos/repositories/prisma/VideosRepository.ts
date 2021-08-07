import { prisma } from '@infra/prisma/client';
import { ICreateVideoDTO } from '@modules/videos/dtos/ICreateVideoDTO';
import { IUpdateVideoDTO } from '@modules/videos/dtos/IUpdateVideoDTO';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';

import { IVideosRepository } from '../IVideosRepository';

export class VideosRepository implements IVideosRepository {
  private repository = prisma.video;

  async create({
    user_id,
    category_id,
    title,
    description,
    url,
  }: ICreateVideoDTO): Promise<IVideoDTO> {
    const video = await this.repository.create({
      data: {
        user_id,
        category_id,
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

  async findByTitleAndUser(
    user_id: string,
    title: string,
  ): Promise<IVideoDTO[]> {
    const videos = await this.repository.findMany({
      where: { user_id, title },
      orderBy: { created_at: 'desc' },
    });

    return videos;
  }

  async findAllByUser(user_id: string): Promise<IVideoDTO[]> {
    const videos = await this.repository.findMany({
      where: { user_id },
    });

    return videos;
  }

  async update({
    id,
    title,
    description,
    url,
  }: IUpdateVideoDTO): Promise<IVideoDTO> {
    const video = await this.repository.update({
      where: { id },
      data: {
        title,
        description,
        url,
      },
    });

    return video;
  }

  async delete(video_id: string): Promise<void> {
    await this.repository.delete({
      where: { id: video_id },
    });
  }
}
