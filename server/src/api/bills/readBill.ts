import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Bill } from '../../entities/Bill';

export default async function readBill(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    const bill = await getRepository(Bill).findOne(id);

    if (!bill) {
      ctx.status = 404;
      return;
    }

    ctx.body = bill;
  } catch (err) {
    ctx.throw(500, err);
  }
}
