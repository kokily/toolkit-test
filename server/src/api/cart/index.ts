import Router from 'koa-router';
import { getManager } from 'typeorm';
import { Cart } from '../../entities/Cart';
import { isLoggedIn } from '../../libs/utils';
import addCart from './addCart';
import viewCart from './viewCart';
import removeCart from './removeCart';
import removeCartItem from './removeCartItem';

const cartAPI = new Router();

cartAPI.post('/', isLoggedIn, addCart);
cartAPI.get('/', isLoggedIn, viewCart);
cartAPI.post('/removeCart', isLoggedIn, removeCart);
cartAPI.post('/remove', isLoggedIn, removeCartItem);

export async function getCart(user_id: string) {
  const query = await getManager()
    .createQueryBuilder(Cart, 'cart')
    .where('cart.user_id = :user_id', { user_id })
    .andWhere('cart.completed = false')
    .andWhere('cart.deleted = false');

  const cart = await query.getOne();

  return cart;
}

export default cartAPI;
