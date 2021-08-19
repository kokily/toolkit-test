import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { Item } from '../../entities/Item';

export default async function listItems(ctx: Context) {
  type RequestType = {
    cursor?: string;
    name?: string;
    divide?: string;
    native?: string;
  };

  const { cursor, name, divide, native }: RequestType = ctx.query;

  console.log(cursor, name, divide, native);

  try {
    const query = await getManager()
      .createQueryBuilder(Item, 'items')
      .limit(30)
      .orderBy('items.num', 'DESC');

    if (name) {
      query.andWhere('items.name like :name', {
        name: `%${name}%`,
      });
    }

    if (divide) {
      query.andWhere('items.divide like :divide', {
        divide: `%${divide}%`,
      });
    }

    if (native) {
      query.andWhere('items.native like :native', {
        native: `%${native}`,
      });
    }

    if (cursor) {
      const item = await getRepository(Item).findOne({ id: cursor });

      if (!item) {
        ctx.status = 404;
        return;
      }

      query.andWhere('items.num < :num', {
        num: item.num,
      });
    }

    const items = await query.getMany();

    ctx.body = items;
  } catch (err) {
    ctx.throw(500, err);
  }
}
