import Router from 'koa-router';
import authAPI from './auth';
import itemAPI from './item';
import cartAPI from './cart';
import usersAPI from './users';
import billsAPI from './bills';
import reserveAPI from './reserve';

const api = new Router();

api.use('/auth', authAPI.routes());
api.use('/items', itemAPI.routes());
api.use('/cart', cartAPI.routes());
api.use('/users', usersAPI.routes());
api.use('/bills', billsAPI.routes());
api.use('/reserve', reserveAPI.routes());

export default api;
