import { CreateCategoryController } from '@modules/categories/useCases/CreateCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/categories/useCases/DeleteCategory/DeleteCategoryController';
import { SearchCategoriesController } from '@modules/categories/useCases/SearchCategories/SearchCategoriesController';
import { SearchVideoByCategoryController } from '@modules/categories/useCases/SearchVideoByCategory/SearchVideoByCategoryController';
import { UpdateCategoryController } from '@modules/categories/useCases/UpdateCategory/UpdateCategoryController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { categoriesValidator } from '../validators/categories.validator';

const categoriesRoutes = Router();

const searchCategoriesController = new SearchCategoriesController();
const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const searchVideoByCategoryController = new SearchVideoByCategoryController();

categoriesRoutes.use(ensureAuthenticated);

// CRUD
categoriesRoutes.get('/', searchCategoriesController.handle);

categoriesRoutes.get('/:category_id', searchCategoriesController.handle);

categoriesRoutes.post(
  '/',
  categoriesValidator.create,
  createCategoryController.handle,
);

categoriesRoutes.put('/:category_id', updateCategoryController.handle);

categoriesRoutes.delete('/:category_id', deleteCategoryController.handle);

// Video by Category
categoriesRoutes.get(
  '/:category_id/videos',
  searchVideoByCategoryController.handle,
);

export { categoriesRoutes };
