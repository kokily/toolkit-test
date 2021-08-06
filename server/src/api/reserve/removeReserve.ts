import Joi from 'joi';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Bill } from '../../entities/Bill';
import { validateBody } from '../../libs/utils';

export default async function removeReserve(ctx: Context) {
  type RequestType = {
    bill_id: string;
  };

  const schema = Joi.object().keys({
    bill_id: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { bill_id }: RequestType = ctx.request.body;

  try {
    await getRepository(Bill).update({ id: bill_id }, { reserve: 0 });

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
}
