import Router from 'koa-router';
import { isLoggedIn } from '../../libs/utils';
import login from './login';
import logout from './logout';
import me from './me';
import register from './register';

const authAPI = new Router();

authAPI.post('/login', login);
authAPI.post('/register', register);
authAPI.get('/me', me);
authAPI.post('/logout', isLoggedIn, logout);

export default authAPI;
