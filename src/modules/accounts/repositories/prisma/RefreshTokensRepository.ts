import { prisma } from '@infra/prisma/client';
import { ICreateRefreshTokenDTO } from '@modules/accounts/dtos/ICreateRefreshTokenDTO';
import { IRefreshTokensDTO } from '@modules/accounts/dtos/IRefreshTokensDTO';

import { IRefreshTokensRepository } from '../IRefreshTokensRepository';

export class RefreshTokensRepository implements IRefreshTokensRepository {
  private repository = prisma.refreshToken;

  async create({
    user_id,
    token,
    expiresIn,
  }: ICreateRefreshTokenDTO): Promise<IRefreshTokensDTO> {
    const refreshToken = this.repository.create({
      data: {
        user_id,
        token,
        expiresIn,
      },
    });

    return refreshToken;
  }
}
