import Router from 'koa-router';
import { isAdminIn } from '../../libs/utils';
import addSign from './addSign';
import removeSign from './removeSign';

const signAPI = new Router();

signAPI.post('/', isAdminIn, addSign);
signAPI.delete('/:id', isAdminIn, removeSign);

export default signAPI;
