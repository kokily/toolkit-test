import Router from 'koa-router';
import { isAdminIn } from '../../libs/utils';
import addWedding from './addWedding';
import listWeddings from './listWeddings';
import readWedding from './readWedding';
import removeWedding from './removeWedding';
import updateWedding from './updateWedding';

const weddingsAPI = new Router();

weddingsAPI.post('/', isAdminIn, addWedding);
weddingsAPI.get('/', isAdminIn, listWeddings);
weddingsAPI.get('/:id', isAdminIn, readWedding);
weddingsAPI.delete('/:id', isAdminIn, removeWedding);
weddingsAPI.patch('/:id', isAdminIn, updateWedding);

export default weddingsAPI;
