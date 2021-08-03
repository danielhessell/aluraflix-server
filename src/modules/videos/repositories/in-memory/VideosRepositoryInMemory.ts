import { prisma } from '@infra/prisma/client';
import { ICreateVideoDTO } from '@modules/videos/dtos/ICreateVideoDTO';
import { IUpdateVideoDTO } from '@modules/videos/dtos/IUpdateVideoDTO';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { v4 as uuid } from 'uuid';

import { IVideosRepository } from '../IVideosRepository';

export class VideosRepositoryInMemory implements IVideosRepository {
  private repository: IVideoDTO[] = [];

  async create({
    user_id,
    category_id,
    title,
    description,
    url,
  }: ICreateVideoDTO): Promise<IVideoDTO> {
    const video = Object.assign(prisma.video, {
      id: uuid(),
      user_id,
      category_id,
      title,
      description,
      url,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.repository.push(video);

    return video;
  }

  async findById(video_id: string): Promise<IVideoDTO> {
    throw new Error('Not implemented');
  }

  async findByTitle(title: string): Promise<IVideoDTO[]> {
    throw new Error('Not implemented');
  }

  async findAllByUser(user_id: string): Promise<IVideoDTO[]> {
    throw new Error('Not implemented');
  }

  async update({
    id,
    title,
    description,
    url,
  }: IUpdateVideoDTO): Promise<IVideoDTO> {
    throw new Error('Not implemented');
  }

  async delete(video_id: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
