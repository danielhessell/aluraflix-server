import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteVideoUseCase } from './DeleteVideoUseCase';

export class DeleteVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { video_id } = request.params;

    const deleteVideo = container.resolve(DeleteVideoUseCase);

    await deleteVideo.execute({
      video_id,
    });

    return response
      .status(200)
      .json({ message: 'Successfully deleted video!' });
  }
}
