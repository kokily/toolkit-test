import Router from 'koa-router';
import { isLoggedIn } from '../../libs/utils';
import addBill from './addBill';
import listBills from './listBills';
import readBill from './readBill';
import removeBill from './removeBill';
import restoreBill from './restoreBill';

const billsAPI = new Router();

billsAPI.post('/', isLoggedIn, addBill);
billsAPI.get('/', isLoggedIn, listBills);
billsAPI.get('/:id', isLoggedIn, readBill);
billsAPI.delete('/:id', isLoggedIn, removeBill);
billsAPI.post('/restore/:id', isLoggedIn, restoreBill);

export default billsAPI;
