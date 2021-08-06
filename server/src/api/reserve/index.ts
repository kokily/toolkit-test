import Router from 'koa-router';
import { isAdminIn } from '../../libs/utils';
import addReserve from './addReserve';
import removeReserve from './removeReserve';

const reserveAPI = new Router();

reserveAPI.post('/', isAdminIn, addReserve);
reserveAPI.patch('/', isAdminIn, removeReserve);

export default reserveAPI;
