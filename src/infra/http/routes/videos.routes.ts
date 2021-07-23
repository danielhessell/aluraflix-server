import { CreateVideoController } from '@modules/videos/useCases/CreateVideo/CreateVideoController';
import { ListUserVideosController } from '@modules/videos/useCases/ListUserVideos/ListUserVideosController';
import { SearchVideoController } from '@modules/videos/useCases/SearchVideo/SearchVideoController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const videosRoutes = Router();

const createVideosController = new CreateVideoController();
const listUserVideosController = new ListUserVideosController();
const searchVideoController = new SearchVideoController();

videosRoutes.use(ensureAuthenticated);

videosRoutes.post('/', createVideosController.handle);

videosRoutes.get('/', listUserVideosController.handle);

videosRoutes.get('/:video_id', searchVideoController.handle);

export { videosRoutes };
