import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserVideosUseCase } from './ListUserVideosUserUseCase';

export class ListUserVideosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { search } = request.query;

    const listUserVideos = container.resolve(ListUserVideosUseCase);

    const videos = await listUserVideos.execute({
      user_id,
      title: search as string,
    });

    return response.json(videos);
  }
}
