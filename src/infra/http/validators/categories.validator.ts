import { celebrate, Joi, Segments } from 'celebrate';

export const categoriesValidator = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      color: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: {
      title: Joi.string(),
      color: Joi.string(),
    },
  }),
};
