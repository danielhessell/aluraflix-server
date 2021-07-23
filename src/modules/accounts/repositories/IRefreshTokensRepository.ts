import { ICreateRefreshTokenDTO } from '../dtos/ICreateRefreshTokenDTO';
import { IRefreshTokensDTO } from '../dtos/IRefreshTokensDTO';

export interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<IRefreshTokensDTO>;
}
