import { AuthenticateUserController } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';
import { Router } from 'express';

const sessionsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRoutes.post('/', authenticateUserController.handle);

export { sessionsRoutes };
