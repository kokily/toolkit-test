import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Item } from '../../entities/Item';

export default async function removeItem(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    await getRepository(Item).delete(id);

    ctx.status = 204;
  } catch (err) {
    ctx.throw(500, err);
  }
}
