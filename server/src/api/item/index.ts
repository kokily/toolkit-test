import Router from 'koa-router';
import { isAdminIn, isLoggedIn } from '../../libs/utils';
import addItem from './addItem';
import listItems from './listItems';
import readItem from './readItem';
import removeItem from './removeItem';
import updateItem from './updateItem';

const itemAPI = new Router();

itemAPI.post('/', isAdminIn, addItem);
itemAPI.get('/', isLoggedIn, listItems);
itemAPI.get('/:id', isLoggedIn, readItem);
itemAPI.delete('/:id', isAdminIn, removeItem);
itemAPI.patch('/:id', isAdminIn, updateItem);

export default itemAPI;
