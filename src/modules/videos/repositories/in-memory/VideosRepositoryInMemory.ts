import { ICreateVideoDTO } from '@modules/videos/dtos/ICreateVideoDTO';
import { IUpdateVideoDTO } from '@modules/videos/dtos/IUpdateVideoDTO';
import { IVideoDTO } from '@modules/videos/dtos/IVideoDTO';
import { v4 as uuid } from 'uuid';

import { IVideosRepository } from '../IVideosRepository';

export class VideosRepositoryInMemory implements IVideosRepository {
  private inMemory: IVideoDTO[] = [];

  async create({
    user_id,
    category_id,
    title,
    description,
    url,
  }: ICreateVideoDTO): Promise<IVideoDTO> {
    const video = {
      id: uuid(),
      user_id,
      category_id,
      title,
      description,
      url,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.inMemory.push(video);

    return video;
  }

  async findById(video_id: string): Promise<IVideoDTO> {
    const video = this.inMemory.find(video => video.id === video_id);

    return video;
  }

  async findByTitleAndUser(
    user_id: string,
    title: string,
  ): Promise<IVideoDTO[]> {
    const videos = this.inMemory.filter(video => {
      if (video.user_id === user_id && video.title === title) {
        return video;
      }

      return null;
    });

    return videos;
  }

  async findAllByUser(user_id: string): Promise<IVideoDTO[]> {
    const videos = this.inMemory.filter(video => {
      if (video.user_id === user_id) {
        return video;
      }

      return null;
    });

    return videos;
  }

  async update({
    id,
    title,
    description,
    url,
  }: IUpdateVideoDTO): Promise<IVideoDTO> {
    const video = this.inMemory.find(video => video.id === id);

    video.title = title;
    video.description = description;
    video.url = url;

    return video;
  }

  async delete(video_id: string): Promise<void> {
    const video = this.inMemory
      .map(video => video.id === video_id)
      .indexOf(true);

    this.inMemory.splice(video, 1);
  }
}
