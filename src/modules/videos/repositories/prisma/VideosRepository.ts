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
}
