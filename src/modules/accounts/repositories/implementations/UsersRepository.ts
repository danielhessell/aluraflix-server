import { prisma } from '../../../../prisma/client';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserDTO } from '../../dtos/IUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<IUserDTO> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<IUserDTO> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
