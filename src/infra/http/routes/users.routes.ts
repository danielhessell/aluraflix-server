import { CreateUserController } from '@modules/accounts/useCases/CreateUser/CreateUserController';
import { Router } from 'express';

import { usersValidator } from '../validators/users.validator';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', usersValidator.create, createUserController.handle);

export { usersRoutes };
