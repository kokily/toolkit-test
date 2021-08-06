import Router from 'koa-router';
import { isAdminIn } from '../../libs/utils';
import addWedding from './addWedding';
import listWeddings from './listWeddings';
import readWedding from './readWedding';

const weddingsAPI = new Router();

weddingsAPI.post('/', isAdminIn, addWedding);
weddingsAPI.get('/', isAdminIn, listWeddings);
weddingsAPI.get('/:id', isAdminIn, readWedding);

export default weddingsAPI;
