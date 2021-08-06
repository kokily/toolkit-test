import Router from 'koa-router';
import authAPI from './auth';

const api = new Router();

api.use('/auth', authAPI.routes());

export default api;
