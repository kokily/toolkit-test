import { Context } from 'koa';
import { getCart } from '.';

export default async function viewCart(ctx: Context) {
  const user_id = ctx.state.user.id;

  try {
    const cart = await getCart(user_id);

    if (!cart) {
      ctx.status = 404;
      return;
    }

    ctx.body = cart;
  } catch (err) {
    ctx.throw(500, err);
  }
}
