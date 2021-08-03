import { AppError } from '@infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alberta Hunter',
      email: 'albertahunter@example.com',
      password: '32550',
    });

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: '32550',
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'dib@focalid.lk',
        password: '36444',
      }),
    ).rejects.toEqual(new AppError('Email/password is incorrect!'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alberta Hunter',
      email: 'albertahunter@example.com',
      password: '32550',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '32552',
      }),
    ).rejects.toEqual(new AppError('Email/password is incorrect!'));
  });
});
