import Router from 'koa-router';
import addSign from './addSign';
import removeSign from './removeSign';

const signAPI = new Router();

signAPI.post('/', addSign);
signAPI.delete('/:id', removeSign);

export default signAPI;
