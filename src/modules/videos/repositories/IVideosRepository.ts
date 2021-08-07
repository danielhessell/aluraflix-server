import { ICreateVideoDTO } from '../dtos/ICreateVideoDTO';
import { IUpdateVideoDTO } from '../dtos/IUpdateVideoDTO';
import { IVideoDTO } from '../dtos/IVideoDTO';

export interface IVideosRepository {
  create(data: ICreateVideoDTO): Promise<IVideoDTO>;
  findById(video_id: string): Promise<IVideoDTO>;
  findByTitleAndUser(user_id: string, title: string): Promise<IVideoDTO[]>;
  findAllByUser(user_id: string): Promise<IVideoDTO[]>;
  update(data: IUpdateVideoDTO): Promise<IVideoDTO>;
  delete(video_id: string): Promise<void>;
}
