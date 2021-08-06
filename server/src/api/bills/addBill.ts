import Joi from 'joi';
import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { Bill } from '../../entities/Bill';
import { Cart } from '../../entities/Cart';
import { validateBody } from '../../libs/utils';
import sendSms from '../../libs/sendSms';

export default async function addBill(ctx: Context) {
  const { id: user_id, username } = ctx.state.user;

  type RequestType = {
    title: string;
    hall: string;
    etc: string;
  };

  const schema = Joi.object().keys({
    title: Joi.string().required(),
    hall: Joi.string().required(),
    etc: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { title, hall, etc }: RequestType = ctx.request.body;

  try {
    const query = await getManager()
      .createQueryBuilder(Cart, 'cart')
      .where('cart.user_id = :user_id', { user_id })
      .andWhere('cart.completed = false')
      .andWhere('cart.deleted = false');

    const cart = await query.getOne();

    if (!cart) {
      ctx.status = 404;
      ctx.body = {
        name: 'CART_NOT_FOUND',
      };
      return;
    }

    let total = 0;

    cart.items.map((item) => {
      return (total += item.amount);
    });

    const billRepo = await getRepository(Bill);
    const bill = new Bill();

    bill.title = title;
    bill.hall = hall;
    bill.etc = etc;
    bill.user_id = user_id;
    bill.username = username;
    bill.cart_id = cart.id;
    bill.total_amount = total;
    bill.items = cart.items;

    await billRepo.save(bill);
    await getRepository(Cart).update({ id: cart.id }, { completed: true });
    await sendSms(ctx, username, title, hall);

    ctx.boxy = bill;
  } catch (err) {
    ctx.throw(500, err);
  }
}
