import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { Cart } from '../../entities/Cart';

export default async function removeCart(ctx: Context) {
  const user_id = ctx.state.user.id;

  try {
    const query = await getManager()
      .createQueryBuilder(Cart, 'cart')
      .where('cart.user_id = :user_id', { user_id })
      .andWhere('cart.completed = false')
      .andWhere('cart.deleted = false');

    const cart = await query.getOne();

    if (!cart) {
      ctx.status = 404;
      return;
    }

    let removeCart = {
      ...cart,
      deleted: true,
    };

    await getRepository(Cart).update({ id: cart.id }, { ...removeCart });

    ctx.status = 204;
  } catch (err) {
    ctx.throw(500, err);
  }
}
