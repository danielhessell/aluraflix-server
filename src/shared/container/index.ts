import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/prisma/UsersRepository';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/categories/repositories/prisma/CategoriesRepository';
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

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
