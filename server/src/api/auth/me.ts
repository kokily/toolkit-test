import { Context } from 'koa';
import { setCookie } from '../../libs/auth';

export default async function me(ctx: Context) {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 401;

    setCookie(ctx, '');

    ctx.body = {
      name: 'NOT_PERMISSION',
    };
    return;
  }

  ctx.body = user;
}
