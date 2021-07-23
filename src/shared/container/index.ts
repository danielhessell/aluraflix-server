import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/prisma/UsersRepository';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { VideosRepository } from '@modules/videos/repositories/prisma/VideosRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IVideosRepository>(
  'VideosRepository',
  VideosRepository,
);
