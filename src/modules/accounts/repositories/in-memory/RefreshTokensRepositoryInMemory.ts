import { prisma } from '@infra/prisma/client';
import { ICreateRefreshTokenDTO } from '@modules/accounts/dtos/ICreateRefreshTokenDTO';
import { IRefreshTokensDTO } from '@modules/accounts/dtos/IRefreshTokensDTO';
import { v4 as uuid } from 'uuid';

import { IRefreshTokensRepository } from '../IRefreshTokensRepository';

export class RefreshTokensRepositoryInMemory
  implements IRefreshTokensRepository {
  private inMemory: IRefreshTokensDTO[] = [];

  async create({
    user_id,
    token,
    expiresIn,
  }: ICreateRefreshTokenDTO): Promise<IRefreshTokensDTO> {
    const refreshToken = Object.assign(prisma.refreshToken, {
      id: uuid(),
      user_id,
      token,
      expiresIn,
      created_at: new Date(),
    });

    this.inMemory.push(refreshToken);

    return refreshToken;
  }
}
