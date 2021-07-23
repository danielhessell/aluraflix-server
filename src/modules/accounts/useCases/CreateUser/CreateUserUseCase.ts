import { AppError } from '@infra/http/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const passwordHashed = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return UserMapper.toDTO(user);
  }
}
