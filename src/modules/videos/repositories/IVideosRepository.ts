import { ICreateVideoDTO } from '../dtos/ICreateVideoDTO';
import { IVideoDTO } from '../dtos/IVideoDTO';

export interface IVideosRepository {
  create(data: ICreateVideoDTO): Promise<IVideoDTO>;
}
