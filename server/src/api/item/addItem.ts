import Joi from 'joi';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Item } from '../../entities/Item';
import { validateBody } from '../../libs/utils';

export default async function addItem(ctx: Context) {
  type RequestBody = {
    name: string;
    divide: string;
    native: string;
    unit: string;
    price: number;
  };

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    divide: Joi.string().required(),
    native: Joi.string().required(),
    unit: Joi.string().required(),
    price: Joi.number().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { name, divide, native, unit, price }: RequestBody = ctx.request.body;

  try {
    const itemRepo = await getRepository(Item);
    const count = await itemRepo.count();
    const item = new Item();

    item.name = name;
    item.divide = divide;
    item.native = native;
    item.unit = unit;
    item.price = price;
    item.num = count + 1;

    await itemRepo.save(item);

    ctx.body = item;
  } catch (err) {
    ctx.throw(500, err);
  }
}
