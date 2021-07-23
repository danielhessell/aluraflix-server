import { prisma } from '@infra/prisma/client';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository = prisma.user;

  async create({ name, email, password }: ICreateUserDTO): Promise<IUserDTO> {
    const user = await this.repository.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<IUserDTO> {
    const user = await this.repository.findUnique({
      where: { email },
    });

    return user;
  }
}
