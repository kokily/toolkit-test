import Joi from 'joi';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Bill } from '../../entities/Bill';
import { validateBody } from '../../libs/utils';

export default async function addReserve(ctx: Context) {
  type RequestType = {
    bill_id: string;
    reserve: number;
  };

  const schema = Joi.object().keys({
    bill_id: Joi.string().required(),
    reserve: Joi.number().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { bill_id, reserve }: RequestType = ctx.request.body;

  try {
    await getRepository(Bill).update({ id: bill_id }, { reserve });

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
}
