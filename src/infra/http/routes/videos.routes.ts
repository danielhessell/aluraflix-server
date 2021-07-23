import { CreateVideoController } from '@modules/videos/useCases/CreateVideo/CreateVideoController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const videosRoutes = Router();

const createVideosController = new CreateVideoController();

videosRoutes.use(ensureAuthenticated);

videosRoutes.post('/', createVideosController.handle);

export { videosRoutes };
