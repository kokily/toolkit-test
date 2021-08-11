import Router from 'koa-router';
import { isAdminIn } from '../../libs/utils';
import listLaunch from './listLaunch';
import topTitle from './topTitle';

const resultAPI = new Router();

resultAPI.get('/top', isAdminIn, topTitle);
resultAPI.get('/launches', isAdminIn, listLaunch);

export default resultAPI;
