import Router from 'koa-router';
import authAPI from './auth';
import cartAPI from './cart';
import itemAPI from './item';

const api = new Router();

api.use('/auth', authAPI.routes());
api.use('/items', itemAPI.routes());
api.use('/cart', cartAPI.routes());

export default api;
