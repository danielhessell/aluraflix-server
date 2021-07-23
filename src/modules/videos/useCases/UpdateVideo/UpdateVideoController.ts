import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateVideoUseCase } from './UpdateVideoUseCase';

export class UpdateVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { video_id } = request.params;
    const { title, description, url } = request.body;

    const updateVideo = container.resolve(UpdateVideoUseCase);

    const video = await updateVideo.execute({
      id: video_id,
      title,
      description,
      url,
    });

    return response.json(video);
  }
}
