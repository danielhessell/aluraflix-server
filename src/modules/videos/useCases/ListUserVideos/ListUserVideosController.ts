import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserVideosUseCase } from './ListUserVideoUseCase';

export class ListUserVideosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { search, page } = request.query;

    const listUserVideos = container.resolve(ListUserVideosUseCase);

    const videos = await listUserVideos.execute({
      user_id,
      page: Number(page),
      title: search as string,
    });

    return response.json(videos);
  }
}
