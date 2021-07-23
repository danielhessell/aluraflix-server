import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateVideoUseCase } from './CreateVideoUseCase';

export class CreateVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title, description, url } = request.body;

    const createVideo = container.resolve(CreateVideoUseCase);

    const video = await createVideo.execute({
      user_id,
      title,
      description,
      url,
    });

    return response.status(201).json(video);
  }
}
