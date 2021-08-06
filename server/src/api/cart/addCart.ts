import Joi from 'joi';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { getCart } from '.';
import { Cart } from '../../entities/Cart';
import { Item } from '../../entities/Item';
import { validateBody } from '../../libs/utils';

export default async function addCart(ctx: Context) {
  const user_id = ctx.state.user.id;

  type RequestBody = {
    item_id: string;
    count: number;
    price: number;
  };

  const schema = Joi.object().keys({
    item_id: Joi.string().required(),
    count: Joi.string().required(),
    price: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { item_id, count, price }: RequestBody = ctx.request.body;

  try {
    const prevCart = await getCart(user_id);
    const item = await getRepository(Item).findOne({ id: item_id });

    if (!item) {
      ctx.status = 404;
      return;
    }

    const addItem = {
      ...item,
      count,
      price,
      amount: count * price,
    };

    // 개인 카트가 없을 시 생성
    if (!prevCart) {
      const cartRepo = await getRepository(Cart);
      const cart = new Cart();

      cart.items = [addItem];
      cart.user_id = user_id;
      cart.completed = false;
      cart.deleted = false;

      await cartRepo.save(cart);

      ctx.body = cart;
    } else {
      // 개인카트가 있을 시 카트에 품목 추가
      await getRepository(Cart).update(
        { id: prevCart.id },
        {
          ...prevCart,
          items: [...prevCart.items, addItem],
        }
      );

      const cart = await getRepository(Cart).findOne({ id: prevCart.id });

      if (!cart) {
        ctx.status = 500;
        return;
      }

      ctx.body = cart;
    }
  } catch (err) {
    ctx.throw(500, err);
  }
}
