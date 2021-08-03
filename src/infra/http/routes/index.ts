import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { sessionsRoutes } from './sessions.routes';
import { usersRoutes } from './users.routes';
import { videosRoutes } from './videos.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/videos', videosRoutes);
routes.use('/categories', categoriesRoutes);

export { routes };
