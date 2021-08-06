import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

export default async function readUser(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    const user = await getRepository(User).findOne(id);

    if (!user) {
      ctx.status = 404;
      return;
    }

    ctx.body = user;
  } catch (err) {
    ctx.throw(500, err);
  }
}
