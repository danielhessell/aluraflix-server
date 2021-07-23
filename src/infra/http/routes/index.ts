import { Router } from 'express';

import { sessionsRoutes } from './sessions.routes';
import { usersRoutes } from './users.routes';
import { videosRoutes } from './videos.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/videos', videosRoutes);

export { routes };
