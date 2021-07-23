import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SearchVideoUseCase } from './SearchVideoUseCase';

export class SearchVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { video_id } = request.params;

    const searchVideo = container.resolve(SearchVideoUseCase);

    const video = await searchVideo.execute({
      video_id,
    });

    return response.json(video);
  }
}
