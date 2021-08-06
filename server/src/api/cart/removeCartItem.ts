import { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import { getCart } from '.';
import { Cart } from '../../entities/Cart';
import { validateBody } from '../../libs/utils';

export default async function removeCartItem(ctx: Context) {
  const user_id = ctx.state.user.id;

  type RequestType = {
    item_id: string;
  };

  const schema = Joi.object().keys({
    item_id: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { item_id }: RequestType = ctx.request.body;

  try {
    const cart = await getCart(user_id);

    if (!cart) {
      ctx.status = 404;
      return;
    }

    // 카트 품목이 하나 남았을 경우 카트 삭제
    if (cart.items.length === 1) {
      let removeCart = {
        ...cart,
        deleted: true,
      };

      await getRepository(Cart).update({ id: cart.id }, { ...removeCart });

      ctx.status = 204;
    } else {
      // 카트 품목 두 개 이상일 경우 카트 내 품목 삭제
      const idx = cart.items.findIndex((item) => {
        return item.id === item_id;
      });

      let updateCart = { ...cart };

      if (idx > -1) {
        updateCart.items.splice(idx, 1);
      }

      await getRepository(Cart).update({ id: cart.id }, { ...updateCart });

      ctx.status = 200;
    }
  } catch (err) {
    ctx.throw(500, err);
  }
}
