import { User } from './User';
import { Item } from './Item';
import { Cart } from './Cart';
import { Bill } from './Bill';
import { Wedding } from './wedding';
import { Convention } from './wedding/Convention';
import { Company } from './wedding/Company';
import { Hanbok } from './wedding/Hanbok';
import { Event } from './wedding/Event';
import { Meal } from './wedding/Meal';
import { Present } from './wedding/Present';
import { Reserve } from './wedding/Reserve';

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

const entities = [
  User,
  Item,
  Cart,
  Bill,
  Wedding,
  Convention,
  Company,
  Hanbok,
  Event,
  Meal,
  Present,
  Reserve,
];

export default entities;
