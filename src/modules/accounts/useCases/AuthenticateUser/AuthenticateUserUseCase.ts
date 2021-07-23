import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { auth } from '../../../../config/auth';
import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Check user exists
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email/password is incorrect!');
    }

    // Verify password
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email/password is incorrect!');
    }

    // Generate token
    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expiresIn_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    } as IResponse;
  }
}
