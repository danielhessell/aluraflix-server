import { container } from 'tsyringe';

import { IUsersRepository } from '../modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '../modules/accounts/repositories/prisma/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
