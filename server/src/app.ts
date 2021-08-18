import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import logger from 'koa-logger';
import bodyParser from 'koa-body';
import api from './api';
import jwtMiddleware from './libs/auth';

const { default: enforceHttps } = require('koa-sslify');

const app = new Koa();
const router = new Router();

process.env.NODE_ENV === 'production' && app.use(enforceHttps({ port: 443 }));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://paysys.kr'
        : 'http://localhost:3000',
    credentials: true,
  })
);
app.use(jwtMiddleware);
app.use(logger());
app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

router.use('/api', api.routes());

export default app;
