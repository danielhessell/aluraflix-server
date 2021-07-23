import { ICreateVideoDTO } from '../dtos/ICreateVideoDTO';
import { IVideoDTO } from '../dtos/IVideoDTO';

export interface IVideosRepository {
  create(data: ICreateVideoDTO): Promise<IVideoDTO>;
  findById(video_id: string): Promise<IVideoDTO>;
  findAllByUser(user_id: string): Promise<IVideoDTO[]>;
}
