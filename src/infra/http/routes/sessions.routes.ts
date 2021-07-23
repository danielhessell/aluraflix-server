import { AuthenticateUserController } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';
import { Router } from 'express';

import { sessionsValidator } from '../validators/sessions.validator';

const sessionsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRoutes.post(
  '/',
  sessionsValidator.authentication,
  authenticateUserController.handle,
);

export { sessionsRoutes };
