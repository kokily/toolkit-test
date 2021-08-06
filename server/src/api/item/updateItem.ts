import Joi from 'joi';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Item } from '../../entities/Item';
import { cleanAllNullArgs, validateBody } from '../../libs/utils';

export default async function updateItem(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  const schema = Joi.object().keys({
    name: Joi.string(),
    divide: Joi.string(),
    native: Joi.string(),
    unit: Joi.string(),
    price: Joi.number(),
  });

  if (!validateBody(ctx, schema)) return;

  try {
    await getRepository(Item).update(
      {
        id,
      },
      {
        ...cleanAllNullArgs(ctx.request.body),
        updated_at: new Date(),
      }
    );
  } catch (err) {
    ctx.throw(500, err);
  }
}
