import { Context } from 'koa';

export default async function me(ctx: Context) {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 401;
    ctx.body = {
      name: 'NOT_PERMISSION',
    };
    return;
  }

  ctx.body = user;
}
