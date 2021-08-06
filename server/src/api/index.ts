import Router from 'koa-router';
import authAPI from './auth';
import cartAPI from './cart';
import itemAPI from './item';
import usersAPI from './users';
import billsAPI from './bills';

const api = new Router();

api.use('/auth', authAPI.routes());
api.use('/items', itemAPI.routes());
api.use('/cart', cartAPI.routes());
api.use('/users', usersAPI.routes());
api.use('/bills', billsAPI.routes());

export default api;
