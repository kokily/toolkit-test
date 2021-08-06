import { Context } from 'koa';
import { setCookie } from '../../libs/auth';

export default async function logout(ctx: Context) {
  setCookie(ctx);
  ctx.status = 204;
}
