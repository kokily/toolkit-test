import Joi from 'joi';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Wedding } from '../../entities/wedding';
import { validateBody } from '../../libs/utils';

export default async function addSign(ctx: Context) {
  type RequestType = {
    weddingId: string;
    sex: 'husband' | 'bride';
    image: string;
  };

  const schema = Joi.object().keys({
    weddingId: Joi.string().required(),
    sex: Joi.string().required(),
    image: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { weddingId, sex, image }: RequestType = ctx.request.body;

  try {
    if (sex === 'husband') {
      await getRepository(Wedding).update(
        { id: weddingId },
        { husband_image: image }
      );

      ctx.status = 200;
    } else {
      await getRepository(Wedding).update(
        { id: weddingId },
        { bride_image: image }
      );

      ctx.status = 200;
    }
  } catch (err) {
    ctx.throw(500, err);
  }
}
