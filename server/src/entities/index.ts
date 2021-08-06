import { User } from './User';
import { Item } from './Item';
import { Cart } from './Cart';
import { Bill } from './Bill';

export type InputItem = {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
};

const entities = [User, Item, Cart, Bill];

export default entities;
