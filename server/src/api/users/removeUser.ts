import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

export default async function removeUser(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    await getRepository(User).delete(id);

    ctx.status = 204;
  } catch (err) {
    ctx.throw(500, err);
  }
}
