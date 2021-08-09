import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

export class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    const deletecategory = container.resolve(DeleteCategoryUseCase);

    await deletecategory.execute({ category_id });

    return response.json({ message: 'Successfully deleted category!' });
  }
}
