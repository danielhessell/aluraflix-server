import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, title, description, url } = request.body;

    const createVideo = container.resolve(CreateUserUseCase);

    const video = await createVideo.execute({
      user_id,
      title,
      description,
      url,
    });

    return response.status(201).json(video);
  }
}
