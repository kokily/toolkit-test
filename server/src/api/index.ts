import Router from 'koa-router';
import authAPI from './auth';
import itemAPI from './item';

const api = new Router();

api.use('/auth', authAPI.routes());
api.use('/items', itemAPI.routes());

export default api;
