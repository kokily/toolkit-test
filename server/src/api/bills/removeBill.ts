import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Bill } from '../../entities/Bill';

export default async function removeBill(ctx: Context) {
  const { id: user_id, admin } = ctx.state.user;
  const { id }: { id: string } = ctx.params;

  try {
    const bill = await getRepository(Bill).findOne(id);

    if (!bill) {
      ctx.status = 404;
      return;
    }

    if (admin || user_id === bill.user_id) {
      await getRepository(Bill).delete(id);

      ctx.status = 204;
    } else {
      ctx.status = 403;
    }
  } catch (err) {
    ctx.throw(500, err);
  }
}
