import { celebrate, Joi, Segments } from 'celebrate';

export const videosValidator = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      url: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: {
      title: Joi.string(),
      description: Joi.string(),
      url: Joi.string(),
    },
  }),
};
