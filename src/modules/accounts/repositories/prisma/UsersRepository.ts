import { prisma } from '../../../../prisma/client';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserDTO } from '../../dtos/IUserDTO';
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
