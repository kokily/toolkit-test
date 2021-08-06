import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Bill } from '../../entities/Bill';
import { Cart } from '../../entities/Cart';

export default async function restoreBill(ctx: Context) {
  const user_id = ctx.state.user.id;
  const { id }: { id: string } = ctx.params;

  try {
    const bill = await getRepository(Bill).findOne(id);

    if (!bill) {
      ctx.status = 404;
      return;
    }

    if (user_id !== bill.user_id) {
      ctx.status = 403;
      return;
    }

    const cart = await getRepository(Cart).findOne({ id: bill.cart_id });

    if (!cart) {
      ctx.status = 404;
      return;
    }

    const restoreCart = { ...cart };

    restoreCart.completed = false;

    await getRepository(Cart).update({ id: cart.id }, { ...restoreCart });
    await getRepository(Bill).delete(id);

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
}
