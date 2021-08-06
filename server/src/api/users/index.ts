import Router from 'koa-router';
import { isAdminIn } from '../../libs/utils';
import initPassword from './initPassword';
import listUsers from './listUsers';
import readUser from './readUser';
import removeUser from './removeUser';
import setAdmin from './setAdmin';
import setEmployee from './setEmployee';

const usersAPI = new Router();

usersAPI.get('/', isAdminIn, listUsers);
usersAPI.get('/:id', isAdminIn, readUser);
usersAPI.delete('/:id', isAdminIn, removeUser);
usersAPI.patch('/admin/:id', isAdminIn, setAdmin);
usersAPI.patch('/employee/:id', isAdminIn, setEmployee);
usersAPI.patch('/password/:id', isAdminIn, initPassword);

export default usersAPI;
