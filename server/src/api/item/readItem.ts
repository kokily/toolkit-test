import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Item } from '../../entities/Item';

export default async function readItem(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    const item = await getRepository(Item).findOne(id);

    if (!item) {
      ctx.status = 404;
      return;
    }

    ctx.body = item;
  } catch (err) {
    ctx.throw(500, err);
  }
}
