import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SearchCategoriesUseCase } from './SearchCategoriesUseCase';

export class SearchCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    const searchCategories = container.resolve(SearchCategoriesUseCase);

    const categories = await searchCategories.execute({
      category_id,
    });

    return response.json(categories);
  }
}
