import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

export class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const { title, color } = request.body;

    const updateCategory = container.resolve(UpdateCategoryUseCase);

    const category = await updateCategory.execute({
      id: category_id,
      title,
      color,
    });

    return response.json(category);
  }
}
