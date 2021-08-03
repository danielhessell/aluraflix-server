import { prisma } from '@infra/prisma/client';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { v4 as uuid } from 'uuid';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  private inMemory: IUserDTO[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<IUserDTO> {
    const user = Object.assign(prisma.user, {
      id: uuid(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.inMemory.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<IUserDTO> {
    const user = this.inMemory.find(user => user.email === email);

    return user;
  }
}
