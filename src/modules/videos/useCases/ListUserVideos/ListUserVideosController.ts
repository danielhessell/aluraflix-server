import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserVideosUseCase } from './ListUserVideosUserUseCase';

export class ListUserVideosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserVideos = container.resolve(ListUserVideosUseCase);

    const videos = await listUserVideos.execute({
      user_id,
    });

    return response.json(videos);
  }
}
