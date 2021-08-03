import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SearchVideoByCategoryUseCase } from './SearchVideoByCategoryUseCase';

export class SearchVideoByCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    const searchVideoByCategory = container.resolve(
      SearchVideoByCategoryUseCase,
    );

    const category = await searchVideoByCategory.execute({ category_id });

    return response.json(category);
  }
}
