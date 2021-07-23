import { CreateVideoController } from '@modules/videos/useCases/CreateVideo/CreateVideoController';
import { Router } from 'express';

const videosRoutes = Router();

const createVideosController = new CreateVideoController();

videosRoutes.post('/', createVideosController.handle);

export { videosRoutes };
