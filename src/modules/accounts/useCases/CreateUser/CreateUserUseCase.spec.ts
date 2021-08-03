import { AppError } from '@infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alberta Hunter',
      email: 'albertahunter@example.com',
      password: '32550',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to register a user with an email already registered', async () => {
    await createUserUseCase.execute({
      name: 'Alberta Hunter',
      email: 'albertahunter@example.com',
      password: '32550',
    });

    await expect(
      createUserUseCase.execute({
        name: 'Alberta Hunter',
        email: 'albertahunter@example.com',
        password: '32550',
      }),
    ).rejects.toEqual(new AppError('User already exists!'));
  });
});
